import { Constructor } from './types';

export class Mapper {
  private readonly mappings: Map<string, string[]> = new Map<
    string,
    string[]
  >();

  map<TSource, TDestination>(
    source: TSource,
    destination: Constructor<TDestination>
  ): TDestination {
    if (!source) {
      return undefined;
    }
    const destinationInstance = new destination();
    const properties = this.getMappings(source, destinationInstance);
    properties.forEach((p) => (destination[p] = source[p]));
    return destinationInstance;
  }

  private getMappings<TSource, TDestination>(
    source: TSource,
    destination: TDestination
  ): string[] {
    const key = `${source.constructor.name}-${destination.constructor.name}`;
    let properties = this.mappings.get(key);
    if (!properties) {
      const destinationProperties = Object.getOwnPropertyNames(destination);
      console.log(destinationProperties);
      const sourceProperties = Object.getOwnPropertyNames(source);
      properties = destinationProperties.filter(
        (p) => sourceProperties.indexOf(p) !== -1
      );
      this.mappings.set(key, properties);
    }
    console.log(properties);
    return properties;
  }
}
