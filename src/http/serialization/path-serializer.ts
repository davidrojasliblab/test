import { RequestParameter } from '../transport/types';
import { Serializer } from './base-serializer';

export class PathSerializer extends Serializer {
  public serialize(pathPattern: string, pathArguments: Map<string, RequestParameter>): string {
    let serializedPath = pathPattern;
    pathArguments.forEach((param: RequestParameter) => {
      serializedPath = serializedPath.replace(`{${param.key}}`, `${this.serializeValue(param)}`);
    });
    return serializedPath;
  }
}
