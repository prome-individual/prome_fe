interface ColorValue {
    color: string;
    opacity: number;
}

interface BackgroundColors {
    bg: string;
    gradient: string[];
    gradientReverse: string[];
    start: string[];
    opacity: number;
}

interface TextColors {
    primary: string;
    secondary: string;
    light: string;
}

interface ButtonColors {
    background: string;
    text: string;
    disabled: string;
}

interface FloatingColors extends ColorValue {
    text: string;
    dot: string;
    path: string;
}

interface StatusBarColors {
    background: string;
    text: string;
}

interface ColorsType {
    primary: string;
    circle: ColorValue;
    background: BackgroundColors;
    text: TextColors;
    button: ButtonColors;
    shadow: ColorValue;
    statusBar: StatusBarColors;
    floating: FloatingColors;
    sky: string;
    buttonWrapper: string;
}

const Colors: ColorsType = {
    primary: '#FE4443',
    circle: {
        color: '#ffffff',
        opacity: 0.41,
    },
    background: {
        bg: '#F6FDFF',
        gradient: ['#ffffff', '#fc4646', '#fe4443'],
        gradientReverse: ['#fe4443', '#fc4646', '#ffffff'],
        start: ['#ffffff', '#ffffff', '#fe4443'],
        opacity: 0.69,
    },
    text: {
        primary: '#000000',
        secondary: '#FE4443',
        light: '#666666',
    },
    button: {
        background: '#ffffff',
        text: '#FE4443',
        disabled: '#d3d3d3',
    },
    shadow: {
        color: '#000000',
        opacity: 0.1,
    },
    statusBar: {
        background: '#ffffff',
        text: '#000000',
    },
    floating: {
        color: '#FE4443',
        text: '#FE4443',
        dot: '#FE4443',
        path: '#FE4443',
        opacity: 0.3,
    },
    sky: '#DDF8FF',
    buttonWrapper: '#F4F4F4',
};

export default Colors;
