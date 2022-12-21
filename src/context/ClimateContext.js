// Temperature has a default value of 50 degrees
// Humidity has a default value of 40%
import { createContext, useContext, useEffect, useState } from 'react';

export const ClimateContext = createContext();

export const useClimate = () => useContext(ClimateContext);

export default function ClimateProvider(props) {
    const [temperature, setTemperature] = useState(50);
    const [humidity, setHumidity] = useState(40);
    const [desiredTemperature, setDesiredTemperature] = useState(50);
    const [desiredHumidity, setDesiredHumidity] = useState(40);

    useEffect(() => {
        const tempChange = setTimeout(() => {
            if (temperature > desiredTemperature) {
                setTemperature(temperature - 1)
            } else if (temperature < desiredTemperature) {
                setTemperature(temperature + 1)
            }
        }, 1000);

        return () => clearInterval(tempChange);
    }, [temperature, desiredTemperature]);

    useEffect(() => {
        const humidityChange = setTimeout(() => {
            if (humidity > desiredHumidity) {
                setHumidity(humidity - 1)
            } else if (humidity < desiredHumidity) {
                setHumidity(humidity + 1)
            }
        }, 500);

        return () => clearInterval(humidityChange);
    }, [humidity, desiredHumidity]);

    return (
        <ClimateContext.Provider
        value={{
            temperature,
            setTemperature,
            humidity,
            setHumidity,
            desiredTemperature,
            setDesiredTemperature,
            desiredHumidity,
            setDesiredHumidity
        }}>
            {props.children}
        </ClimateContext.Provider>
    );
}
