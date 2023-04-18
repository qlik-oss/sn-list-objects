import extend from 'extend';
import { applyJsonPatch, generateJsonPatch } from './json-patch';

export default class SoftPropertyHandler {
  constructor(model) {
    this.model = model;
  }

  async saveSoftProperties(prevEffectiveProperties, effectiveProperties) {
    if (!this.model) {
      return false;
    }

    const patches = generateJsonPatch(prevEffectiveProperties, effectiveProperties);
    const mergedProperties = extend(true, {}, prevEffectiveProperties, effectiveProperties);

    if (!patches?.length) {
      return false;
    }
    const bakedPatches = patches.map((p) => ({
      qOp: p.op,
      qValue: JSON.stringify(p.value),
      qPath: p.path,
    }));

    try {
      await this.model.applyPatches(bakedPatches, true);
    } catch (_err) {
      return false;
    }
    return mergedProperties;
  }

  async mergeSoftPatches() {
    if (!this.model) {
      return;
    }

    const [properties, effective] = await Promise.all([this.model.getProperties(), this.model.getEffectiveProperties()]);
    if (properties.qExtendsId) {
      return;
    }
    const patches = generateJsonPatch(properties, effective);
    applyJsonPatch(properties, patches);
    await this.model.setProperties(properties);
    await this.model.clearSoftPatches();
  }
}
