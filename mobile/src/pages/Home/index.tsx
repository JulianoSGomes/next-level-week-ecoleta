import React, { useEffect, useState } from "react";

import {
  View,
  ImageBackground,
  Image,
  StyleSheet,
  Text,
  Platform,
} from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { Feather as Icon } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import RNPickerSelect from "react-native-picker-select";
import axios from "axios";

interface IBGEUFResponse {
  sigla: string;
}
interface IBGECITYResponse {
  nome: string;
}

const Home = () => {
  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [selectedUf, setSelectedUf] = useState("0");
  const [selectedCity, setSelectedCity] = useState("0");

  const navigation = useNavigation();

  const handleNavigateToPoints = () => {
    navigation.navigate("Points", { selectedUf, selectedCity });
  };

  const handleSelectedUf = (uf: string) => {
    setSelectedUf(uf);
  };

  const handleSelectedCity = (city: string) => {
    setSelectedCity(city);
  };

  useEffect(() => {
    const fetchUFs = async () => {
      const response = axios.get<IBGEUFResponse[]>(
        "https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome"
      );
      setUfs((await response).data.map((uf) => uf.sigla));
    };
    fetchUFs();
  }, []);

  useEffect(() => {
    const fetchCities = async (uf: string) => {
      const response = axios.get<IBGECITYResponse[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`
      );
      setCities((await response).data.map((city) => city.nome));
    };

    if (selectedUf === "0") return;
    fetchCities(selectedUf);
  }, [selectedUf]);
  return (
    <ImageBackground
      style={styles.container}
      source={require("../../assets/home-background.png")}
      imageStyle={{ width: 274, height: 368 }}
    >
      <View style={styles.main}>
        <Image source={require("../../assets/logo.png")} />
        <Text style={styles.title}>Seu Marketplace de coleta de resíduos</Text>
        <Text style={styles.description}>
          Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.
        </Text>
      </View>

      <View style={styles.footer}>
        <RNPickerSelect
          placeholder={{
            label: "Selecione o Estado",
            value: null,
            color: "#9EA0A4",
          }}
          value={selectedUf}
          onValueChange={(uf) => handleSelectedUf(uf)}
          style={styles}
          items={ufs.map((uf) => ({ label: uf, value: uf }))}
        />
        <RNPickerSelect
          placeholder={{
            label: "Selecione a Cidade",
            value: null,
            color: "#9EA0A4",
          }}
          value={selectedCity}
          onValueChange={(city) => handleSelectedCity(city)}
          style={styles}
          items={cities.map((city) => ({ label: city, value: city }))}
        />

        <RectButton style={styles.button} onPress={handleNavigateToPoints}>
          <View style={styles.buttonIcon}>
            <Icon name="arrow-right" color="#FFF" size={24} />
          </View>
          <Text style={styles.buttonText}>Entrar</Text>
        </RectButton>
      </View>
    </ImageBackground>
  );
};
const placeholder = {
  label: "Select a sport...",
  value: null,
  color: "#9EA0A4",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },

  main: {
    flex: 1,
    justifyContent: "center",
  },

  title: {
    color: "#322153",
    fontSize: 32,
    fontFamily: "Ubuntu_700Bold",
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: "#6C6C80",
    fontSize: 16,
    marginTop: 16,
    fontFamily: "Roboto_400Regular",
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {},

  select: {},

  inputIOS: {
    paddingTop: 13,
    paddingBottom: 12,
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },
  inputAndroid: {
    color: "#000",
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  button: {
    backgroundColor: "#34CB79",
    height: 60,
    flexDirection: "row",
    borderRadius: 10,
    overflow: "hidden",
    alignItems: "center",
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
    color: "#FFF",
    fontFamily: "Roboto_500Medium",
    fontSize: 16,
  },
});

export default Home;
