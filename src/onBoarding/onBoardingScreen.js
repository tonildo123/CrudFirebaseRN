import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';

const onBoardingScreen = () => {
  return (
    <Onboarding
        pages={[
        {
        backgroundColor: '#a6e4d0',
        // image: <Image source={require(imagen1)} />,
        title: 'Welcome',
        subtitle: 'Welcome to the first slide of the Onboarding Swiper.',
        },
        {
            backgroundColor: '#a6e4d0',
            // image: <Image source={require(imagen2)} />,
            title: 'Welcome',
            subtitle: 'Welcome to the first slide of the Onboarding Swiper.',
        },
        {
            backgroundColor: '#fdeb93',
            // image: <Image source={require(imagen3)} />,
            title: 'Explore',
            subtitle: 'This is the second slide of the Onboarding Swiper.',
        },
        {
            backgroundColor: '#e9bcbe',
            // image: <Image source={require(imagen1)} />,
            title: 'All Done',
            subtitle: 'This is the Third slide of the Onboarding Swiper.',
        },
        ]}
    />
  )
}

export default onBoardingScreen