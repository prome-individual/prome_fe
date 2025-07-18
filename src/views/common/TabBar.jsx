import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import styled from 'styled-components/native';
import Colors from '../styles/Colors';

const TabBarWrapper = styled.View`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 60px;
    background-color: white;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    border-top-width: 1px;
    border-top-color: ${Colors.primary};
    padding-bottom: 20px;
    shadow-color: #000;
    shadow-offset: 0px -2px;
    shadow-opacity: 0.1;
    shadow-radius: 4px;
    elevation: 5;
`;

const TabButton = styled(TouchableOpacity)`
    flex: 1;
    justify-content: ${props => props.isHome ? 'flex-start' : 'center'};
    align-items: center;
    padding: 8px;
    padding-top: ${props => props.isHome ? '0px' : '20px'};
`;

const TabIcon = styled.View`
    width: ${props => props.isHome ? '56px' : '40px'};
    height: ${props => props.isHome ? '56px' : '40px'};
    border-radius: ${props => props.isHome ? '56px' : '40px'};
    background-color: ${props => props.isActive ? Colors.primary : 'transparent'};
    justify-content: center;
    align-items: center;
    margin-bottom: 4px;
    border: 1px solid ${Colors.primary};
    margin-top: ${props => props.isHome ? '0px' : '50px'};
    background-color: white;
`;

const TabIconImage = styled(Image)`
    width: ${props => props.isHome ? '40px' : '24px'};
    height: ${props => props.isHome ? '40px' : '24px'};
    resize-mode: contain;
    tint-color: ${props => props.isActive ? 'white' : `${Colors.primary}`};
`;

const TabLabel = styled.Text`
    font-size: 16px;
    color: ${Colors.primary};
`;

const TabBar = ({ navigation, currentScreen = 'Home' }) => {
    const tabs = [
        {
            name: 'Profile',
            label: '',
            icon: require('../../assets/profile.png'),
            screen: 'Main',
        },
        {
            name: 'Home',
            label: 'Home',
            icon: require('../../assets/home.png'),
            screen: 'Main',
        },
        {
            name: 'Menu',
            label: '',
            icon: require('../../assets/box.png'),
            screen: 'Main',
        },
    ];

    const handleTabPress = (screen) => {
        if (screen !== currentScreen) {
            navigation.navigate(screen);
        }
    };

    return (
        <TabBarWrapper>
            {tabs.map((tab, index) => {
                const isHome = tab.name === 'Home';
                const isActive = currentScreen === tab.screen;
                return (
                    <TabButton
                        key={index}
                        onPress={() => handleTabPress(tab.screen)}
                        isHome={isHome}
                    >
                        <TabIcon
                            isActive={isActive}
                            isHome={isHome}
                        >
                            <TabIconImage
                                source={tab.icon}
                                isActive={isActive}
                                isHome={isHome}
                            />
                        </TabIcon>
                        {tab.label && (
                            <TabLabel isActive={isActive}>
                                {tab.label}
                            </TabLabel>
                        )}
                    </TabButton>
                );
            })}
        </TabBarWrapper>
    );
};

export default TabBar;
