import {
    Atom,
    BlinkBlur,
    Commet,
    FourSquare,
    LifeLine,
    Mosaic,
    OrbitProgress,
    Riple, Slab,
    ThreeDot, TrophySpin
} from "react-loading-indicators";
import React from "react";

const RandomLoadingIndicator = ({text, color, size, textColor}) => {
    const indicators = [
        <Atom color={color} size={size} text={text} textColor={textColor} />,
        <OrbitProgress color={color} size={size} text={text} textColor={textColor} />,
        <Mosaic color={color} size={size} text={text} textColor={textColor} />,
        <BlinkBlur color={color} size={size} text={text} textColor={textColor} />,
        <Commet color={color} size={size} text={text} textColor={textColor} />,
        <FourSquare color={color} size={size} text={text} textColor={textColor} />,
        <LifeLine color={color} size={size} text={text} textColor={textColor} />,
        <Riple color={color} size={size} text={text} textColor={textColor} />,
        <Slab color={color} size={size} text={text} textColor={textColor} />,
        <ThreeDot color={color} size={size} text={text} textColor={textColor} />,
        <TrophySpin color={color} size={size} text={text} textColor={textColor} />
    ]

    return indicators[(Math.floor(Math.random() * indicators.length))];
}

export default RandomLoadingIndicator;