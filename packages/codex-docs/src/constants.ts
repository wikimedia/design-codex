import { InjectionKey, Ref } from 'vue';
import { HTMLDirection } from '@wikimedia/codex';

export const DirectionKey: InjectionKey<Ref<HTMLDirection>> = Symbol( 'CdxDemoDirection' );
