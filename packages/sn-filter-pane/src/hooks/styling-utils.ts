/* eslint-disable import/prefer-default-export */
// This code originates from Nebula.js

import { stardust } from '@nebula.js/stardust';
import { IGeneralComponent, ISizing, IThemeComponent } from './types/components';

const imageSizingToCssProperty = {
  originalSize: 'auto auto',
  alwaysFit: 'contain',
  fitWidth: '100% auto',
  fitHeight: 'auto 100%',
  stretchFit: '100% 100%',
  alwaysFill: 'cover',
};

const positionToCss = {
  'top-left': 'top left',
  'top-center': 'top center',
  'top-right': 'top right',
  'center-left': 'center left',
  'center-center': 'center center',
  'center-right': 'center right',
  'bottom-left': 'bottom left',
  'bottom-center': 'bottom center',
  'bottom-right': 'bottom right',
};

type ImageDefComponent = {
  useImage?: 'media';
  bgImage?: {
    expressionUrl?: string;
    mode?: 'media' | 'expression';
    mediaUrl?: { qStaticContentUrl?: { qUrl?: string } };
    position?: 'top-left' | 'top-center' | 'top-right' | 'center-left' | 'center-center' | 'center-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
    sizing?: ISizing;
  }
};

type IEngineApp = EngineAPI.IApp & { session: { config?: { url: string } } }; // TODO: add to global type def instead

function getSenseServerUrl(app?: IEngineApp) {
  let config;
  let wsUrl;
  let protocol;
  let isSecure;

  const sessionConfig = app?.session?.config;

  if (sessionConfig) {
    config = sessionConfig;
    wsUrl = new URL(config.url);

    isSecure = wsUrl.protocol === 'wss:';
    protocol = isSecure ? 'https://' : 'http://';
    return protocol + wsUrl.host;
  }
  return '';
}

function getBackgroundPosition(bgComp: ImageDefComponent) {
  let bkgImagePosition = 'center center';
  if (bgComp?.bgImage?.position) {
    bkgImagePosition = positionToCss[bgComp.bgImage.position];
  }
  return bkgImagePosition;
}

function getBackgroundSize(bgComp: ImageDefComponent) {
  let bkgImageSize = imageSizingToCssProperty.originalSize;
  const size = bgComp?.bgImage?.sizing;
  if (size) {
    bkgImageSize = imageSizingToCssProperty[size];
  }
  return bkgImageSize;
}

function resolveImageUrl(app?: EngineAPI.IApp, relativeUrl?: string) {
  return relativeUrl ? getSenseServerUrl(app) + relativeUrl : undefined;
}

export function resolveBgImage(bgComp: ImageDefComponent, app?: EngineAPI.IApp) {
  const bgImageDef = bgComp?.bgImage;

  if (bgImageDef) {
    let url = '' as string | undefined;
    if (bgImageDef.mode === 'media' || bgComp.useImage === 'media') {
      const urlObj = bgImageDef?.mediaUrl;
      const { qUrl } = urlObj?.qStaticContentUrl || {};
      url = qUrl ? decodeURIComponent(qUrl) : undefined;
      url = resolveImageUrl(app, url);
    }
    if (bgImageDef.mode === 'expression') {
      url = bgImageDef.expressionUrl ? decodeURIComponent(bgImageDef.expressionUrl) : undefined;
    }
    const pos = getBackgroundPosition(bgComp);
    const size = getBackgroundSize(bgComp);

    return url ? { url, pos, size } : undefined;
  }
  return undefined;
}

interface IResolveBgColor {
  stardustTheme?: stardust.Theme & { validateColor?: (exp?: string) => string }; // TODO: extend stardust theme type
  themeOverrides?: IThemeComponent;
}

export function resolveBgColor({ stardustTheme, themeOverrides }: IResolveBgColor) {
  let color;
  const bgColor = themeOverrides?.background;
  if (!bgColor) {
    return color;
  }
  if (bgColor?.useExpression && bgColor.colorExpression) {
    color = stardustTheme?.validateColor?.(bgColor.colorExpression);
  } else if (bgColor?.color) {
    color = stardustTheme?.getColorPickerColor(bgColor?.color, false);
  }
  return color;
}

type IGetFilterPaneStyle = (path: string, prop: string) => string | undefined;

const isNumber = (n: unknown) => typeof (n) === 'number' && !Number.isNaN(n);

const parseCssNumber = (px: unknown) => {
  const n = typeof (px) === 'string' ? Number.parseInt(px, 10) : px;
  return isNumber(n) ? n : undefined;
};

export function resolveBorder(getFilterPaneStyle: IGetFilterPaneStyle, comp?: IGeneralComponent) {
  const borderColor = comp?.borderColor || getFilterPaneStyle('', 'borderColor');
  if (comp && !parseCssNumber(comp.borderWidth)) {
    return false;
  }

  const hasBorderWidth = parseCssNumber(`${comp?.borderWidth}` || getFilterPaneStyle('', 'borderWidth'));
  return !!(borderColor && hasBorderWidth);
}
