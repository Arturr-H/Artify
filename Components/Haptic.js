import React from "react";
import * as Haptics from 'expo-haptics';

function Haptic(HAPTIC_TYPE){
    switch (HAPTIC_TYPE) {
        case "heavy":
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
            break;
        
        case "medium":
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            break;

        case "light":
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            break;

        default:
            console.log(`Det finns ingen haptic som heter "${HAPTIC_TYPE}"`);
            break;
    }
}
export default Haptic;