import React, { useState } from 'react'
import {View} from 'react-native';
import { Picker } from "@react-native-picker/picker";
import address from '../../data/address';

function Adress(props) {

    const [province, setProvince] = useState(0);
    const [chooseProvince, setChooseProvince] = useState(0);

    const [district, setDistrict] = useState(0);
    const [chooseDistrict, setChooseDistrict] = useState(0);

    const [ward, setWard] = useState(0);
    
    function setvalProvince(province){
        props.callBacksetProvince(province)
    }
    function setvalDistricts(districts){
        props.callBacksetDistricts(districts)
    }
    function setvalWards(wards){
        props.callBacksetWards(wards)
    }

    return (
        <View>
            <Picker
                    useNativeAndroidPickerStyle={false}
                    selectedValue={province}
                    onValueChange={(itemValue, index) => {
                        setProvince(itemValue);
                        setChooseProvince(index);
                        setvalProvince(itemValue);
                    }
                    }>
                    {address.map((element, index) => (
                        <Picker.Item key={index} label={element.Name} value={element.Name} />
                    ))}
                </Picker>
                <Picker
                    useNativeAndroidPickerStyle={false}
                    selectedValue={district}
                    onValueChange={(itemValue, index) => {
                        setDistrict(itemValue);
                        setChooseDistrict(index);
                        setvalDistricts(itemValue);
                    }
                    }>
                    {address[chooseProvince].Districts.map((element) => (
                        <Picker.Item key={element.Id} label={element.Name} value={element.Name} />
                    ))}
                </Picker>
                <Picker
                    useNativeAndroidPickerStyle={false}
                    selectedValue={ward}
                    onValueChange={(itemValue, index) => {
                        setWard(itemValue);
                        setvalWards(itemValue)
                    }}>
                    {(address[chooseProvince].Districts)[chooseDistrict].Wards.map((element) => (
                        <Picker.Item key={element.Id} label={element.Name} value={element.Name} />
                    ))}
                </Picker>
        </View>
    )
}

export default Adress