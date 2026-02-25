import { moderateScale } from 'react-native-size-matters';

interface FontSizeValue {
    xs: number;
    sm: number;
    md: number;
    mdm: number;
    mm: number;
    lg: number;
    xl: number;
    xxl: number;

}
const Fontsizes: FontSizeValue = {
    xs: moderateScale(12),
    sm: moderateScale(14),
    md: moderateScale(16),
    mdm: moderateScale(18),
    mm: moderateScale(20),
    lg: moderateScale(24),
    xl: moderateScale(28),
    xxl: moderateScale(32),
};

export default Fontsizes;
