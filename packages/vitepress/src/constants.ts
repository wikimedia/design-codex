import { InjectionKey, Ref } from 'vue';
import { HTMLDirection } from 'vue-components/src/types';

export const DirectionKey: InjectionKey<Ref<HTMLDirection>> = Symbol( 'CdxDemoDirection' );
