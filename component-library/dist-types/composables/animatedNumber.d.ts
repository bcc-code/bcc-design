import { type Ref } from 'vue';
export default function useAnimatedNumber(to: Ref<number>, from?: number, duration?: number): {
    value: Ref<number, number>;
};
