#include "DHT.h"        // inclui a biblioteca
#define dht_type DHT11  // define o modelo (tipo) do sensor

int dht_pin = A5;                    // nomeia o pino A5 conectado ao sensor
DHT dht_1 = DHT(dht_pin, dht_type);  // cria o sensor dht_1 e envia para a biblioteca suas informações de modelo e pino

void setup() {         // só acontece uma vez no cc:\Users\coffe\OneDrive - SPTech School\P.I\ProjetoSprint2\projeto-ferazzian\Arduíno\DHT11___Sprint2Ferazzian\DHT11___Sprint2Ferazzian.inoódigo
  Serial.begin(9600);  // inicia o Serial.Monitor com uma taxa de 9600 baud rates
  dht_1.begin();       // inicia o sensor dht_1
}

void loop() {

  // cria variaveis de valor decimal (float) que armazena os dados captados pelo sensor
  float umidade = dht_1.readHumidity();  // %
  int UmidMin = 80;

  float temperatura = dht_1.readTemperature();  // C°
  int TempMax = 26;
  int TempMin = 18;

  ///////////////////////////////////////////////////////////////
  // Se não houver leitura, ele exibi uma mensagem de erro   "is nan" = "é nulo", escreve a frase de erro no monitor e pula linha com "ln"
  if (isnan(temperatura) or isnan(umidade)) {
    Serial.println("Erro ao ler");
  }

  else {
    Serial.print(temperatura);
    Serial.print(";");
    Serial.println(umidade);
  }
  delay(5000);  // faz uma leitura a cada 5 segundo
}