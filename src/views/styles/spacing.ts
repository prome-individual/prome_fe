import { scale } from 'react-native-size-matters';

interface SpacingValue {
    xs: number;
    sm: number;
    mm: number;
    lg: number;
    xl: number;
    xxl: number;
}

const Spacing: SpacingValue = {
    xs: scale(4),
    sm: scale(8),
    mm: scale(12),
    lg: scale(16),
    xl: scale(24),
    xxl: scale(32),
};

export default Spacing;
