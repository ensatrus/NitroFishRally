# Nitro Fish Rally DX


## (硝化魚ラリ)


## Documento de diseño

**Equipo:**

Javier Hoyos Giunta

Nicolás Jiménez Hernández

Jesús Maldonado Becerra

Enrique Satrústegui Coca


## Descripción general

Nitro Fish Rally (硝化魚ラリ) DX es un juego de carreras 2D de vista cenital. Está compuesto de tres circuitos que el jugador irá desbloqueando progresivamente al completarlos, intentando siempre obtener el menor tiempo posible.

El juego se ambienta en Japón, siendo más concretos, los circuitos del juego son ríos que recorre una carpa. La historia del juego sigue el viaje de esta carpa desde el mar hasta la montaña, a lo largo de los tres circuitos acercándose cada vez más a la cima. El objetivo es llegar al final mejorando al pez y dominando cada una de las diferentes pistas. Al final de los 3 circuitos, el pez llega finalmente a la cascada y logra  transformarse en dragón.

Se han elegido las siguientes cartas:



<p id="gdcalert1" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image1.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert2">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image1.png "image_tooltip")


<p id="gdcalert2" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image2.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert3">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image2.png "image_tooltip")


<p id="gdcalert3" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image3.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert4">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image3.png "image_tooltip")


<p id="gdcalert4" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image4.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert5">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image4.png "image_tooltip")



## Gameplay

El objetivo principal a largo plazo del jugador es acumular el suficiente aura para poder transformarse en dragón cuando llegue a la cascada para poder subirla. Para ello tendrá que ir superándolos lo más rápido posible y reunir la suficiente aura.

Para acumular aura, el jugador debe recorrer el circuito lo más rápido posible sin chocar con los obstáculos ni con la pista. A su vez, cuando el jugador alcanza la meta, obtiene una clasificación dentro de los siguientes niveles: bronce, plata y oro.

Cuando el jugador completa un circuito, se le desbloqueará el siguiente circuito, que hasta entonces permanecía bloqueado. Las clasificaciones, tiempo mínimo y los obstáculos de los circuitos están balanceados de tal manera que conforme avanza el jugador a los siguientes circuitos irá aumentando la dificultad de los mismos.


#### Recompensas

Hay una serie de recompensas que serán entregadas al jugador en función de su desempeño dentro de cada nivel:


<table>
  <tr>
   <td>Medalla de bronce
   </td>
   <td>Obtenida al cumplir el requisito mínimo de tiempo del nivel
   </td>
  </tr>
  <tr>
   <td>Medalla de plata
   </td>
   <td>Obtenida al superar el tiempo “medio” del nivel
   </td>
  </tr>
  <tr>
   <td>Medalla de oro
   </td>
   <td>Obtenida al superar el tiempo “difícil” del nivel
   </td>
  </tr>
  <tr>
   <td>Trofeo 
   </td>
   <td>Obtenida al superar el tiempo “difícil” del nivel con el máximo de aura
   </td>
  </tr>
</table>



## Mecánicas


### Movimiento

El jugador se mueve acelerando y dando marcha atrás (teclas W/S) en la dirección en la que mira el pez. Para cambiar de dirección puede girar en sentido horario o antihorario (teclas A/D) por el circuito. El pez mantiene una parte de la inercia generada y tarda en frenar completamente al desacelerar. Además se puede frenar (espacio) que hace que el pez disminuya de velocidad más rápidamente hasta que se quede quieto

El movimiento funciona mediante físicas, por lo que al pez se le aplica una fuerza constante en la dirección en la que mira al acelerar y se deja de aplicar cuando la velocidad llega a la máxima. Además, existe una resistencia del aire que provoca que la velocidad del pez disminuye progresivamente cuando no se le aplican fuerzas. Esta resistencia varía en función de si el pez está acelerando, dando marcha atrás o frenando. Al frenar, además, se le aplica una fuerza al pez en dirección contraria al vector de velocidad que lleva en ese momento.


#### Derrape

Existe cierto “derrape” que causa que el pez frene más o menos de manera natural según el ángulo que haya entre el vector de la velocidad del pez y la dirección a la que está apuntando. Esta relación viene dada por el seno entre esos ángulos (más una pequeña cantidad para evitar problemas con números cercanos a 0) 

Además, mientras se frena, la fuerza con la que se frena depende también del ángulo entre la dirección y la velocidad, solo que de manera inversa a la resistencia del aire. Esto quiere decir que cuanto más alineado esté el pez con la dirección del movimiento, más rápido podrá frenar


#### Peso

En 

<p id="gdcalert5" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: undefined internal link (link text: "piezas"). Did you generate a TOC with blue links? </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert6">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

[piezas](#heading=h.np90tf55xjk) se explica la relación que tienen la aceleración, control y frenado con el peso. Este peso afecta de manera inversa a la velocidad máxima que puede alcanzar el pez, es decir que cuanto mayor sea el peso menor será la velocidad máxima


<table>
  <tr>
   <td>Parámetros
   </td>
   <td>Descripción
   </td>
  </tr>
  <tr>
   <td>aceleración (a)
   </td>
   <td>Cantidad de fuerza que se le aplica al pez cuando se acelera
   </td>
  </tr>
  <tr>
   <td>velocidad máxima (vm)
   </td>
   <td>Velocidad máxima que puede alcanzar el pez
   </td>
  </tr>
  <tr>
   <td>velocidad de giro (c)
   </td>
   <td>Velocidad con la que puede girar el pez
   </td>
  </tr>
  <tr>
   <td>velocidad de frenado (f)
   </td>
   <td>Cantidad de fuerza que se le aplica al pez cuando frena
   </td>
  </tr>
</table>



### Métricas


<table>
  <tr>
   <td>
<h3 style="text-align: center">Métrica</h3>


   </td>
   <td>Medida
   </td>
   <td>Descripción
   </td>
  </tr>
  <tr>
   <td>Velocidad
   </td>
   <td>cm/s
   </td>
   <td>Velocidad a la cual te estás moviendo
   </td>
  </tr>
  <tr>
   <td>Aura
   </td>
   <td>Aura
   </td>
   <td>Cantidad de aura que tienes
   </td>
  </tr>
  <tr>
   <td>Tiempo
   </td>
   <td>Minutos, segundos y milisegundos
   </td>
   <td>Tiempo que ha pasado desde el comienzo del circuito
   </td>
  </tr>
</table>


#Añadir o no frenado,aceleración o control


### Aura

El jugador acumula en base a la velocidad en la que se mueve. Existe una velocidad mínima (m) a partir de la cual empieza a sumar aura (a)  con una relación lineal respecto a la velocidad (

<p id="gdcalert6" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert7">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

) donde k es la velocidad en la que pasa de perder a ganar aura y r es el ratio con el que la gana o pierde.

Además cuando el pez se choca contra cualquier obstáculo o pared pierde instantáneamente una cantidad de aura, esta misma determinada por el ángulo con el que se produzca el choque (usando la función de seno: 

<p id="gdcalert7" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert8">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

).


<table>
  <tr>
   <td>Parámetros
   </td>
   <td>Descripción
   </td>
  </tr>
  <tr>
   <td>frontera de aura(k)
   </td>
   <td>velocidad a partir de la cual la producción de aura pasa de negativo a positivo (depende de la estadística de aceleración)
   </td>
  </tr>
  <tr>
   <td>ganancia máxima de aura (am)
   </td>
   <td>máximo de aura por segundo que puede ganar el jugador por segundo
   </td>
  </tr>
  <tr>
   <td>penalización máxima por choque (n)
   </td>
   <td>máximo de aura que puede perder al jugador al chocar con un obstáculo
   </td>
  </tr>
</table>



### Piezas


<table>
  <tr>
   <td>
   </td>
   <td>cola
<p>
(aceleración)
   </td>
   <td>dorsal (control)
   </td>
   <td>aletas (frenado)
   </td>
  </tr>
  <tr>
   <td>ligero (sube peso)
   </td>
   <td>3
   </td>
   <td>3
   </td>
   <td>3
   </td>
  </tr>
  <tr>
   <td>mid (mid peso)
   </td>
   <td>5
   </td>
   <td>5
   </td>
   <td>5
   </td>
  </tr>
  <tr>
   <td>pesado (baja peso)
   </td>
   <td>7
   </td>
   <td>7
   </td>
   <td>7
   </td>
  </tr>
</table>


Mayor Medio Menor

El peso será la suma de las 3 estadísticas que se hayan elegido (por ejemplo si elijo 3 piezas pesadas el peso será 21). El peso determinará la velocidad máxima que puede alcanzar el pez (como se explica en 

<p id="gdcalert8" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: undefined internal link (link text: "peso"). Did you generate a TOC with blue links? </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert9">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

[peso](#heading=h.7blgshvtn4xw)) así como la inercia que llevará.



<p id="gdcalert9" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image5.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert10">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image5.png "image_tooltip")



## Interfaz y HUD

Al entrar al juego aparece un menú con el título del juego:



<p id="gdcalert10" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image6.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert11">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image6.png "image_tooltip")


*Pantalla de Título*

Tras pulsar cualquier botón del teclado, automáticamente aparece la siguiente pantalla con las opciones principales:



<p id="gdcalert11" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image7.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert12">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image7.png "image_tooltip")


*Menú principal*

Al pulsar el botón jugar, 



<p id="gdcalert12" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image8.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert13">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image8.png "image_tooltip")


*Menú de selección de nivel*

La cámara durante el juego muestra una vista cenital, y sigue siempre al jugador cuando se mueve por la pantalla, manteniéndose siempre en el centro. El HUD durante la partida muestra un cronómetro en la parte superior derecha, mientras que en la izquierda muestra el aura que vas acumulando durante la carrera, en la zona inferior tu velocidad en cm/s,  ocasionalmente se muestra un indicador de alerta, este aparece al moverse en dirección opuesta al circuito. Antes de llegar a las curvas aparece en la zona central superior de la pantalla un aviso de curva con el grado de la curva.


## 

<p id="gdcalert13" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image9.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert14">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image9.png "image_tooltip")


*Ejemplo de imagen de una partida*


## Mundo del juego

Dentro del mundo del juego, además del personaje jugador, encontramos más elementos como pueden ser los obstáculos y npcs.


### Obstáculos

El jugador se encuentra con distintos obstáculos en cada circuito, tales como rocas que tendrá que esquivar, curvas, o mismamente el tiempo límite que tendrá que batir.

#Al final los obstáculos te hacen retroceder o no?


<table>
  <tr>
   <td>Obstáculo
   </td>
   <td>Descripción
   </td>
   <td>Imagen 
   </td>
  </tr>
  <tr>
   <td>Roca
   </td>
   <td>Obstáculo estático de forma semicircular, con varios tamaños y formas, apareciendo en solitario o en agrupaciones.
   </td>
   <td>

<p id="gdcalert14" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image10.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert15">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


<img src="images/image10.png" width="" alt="alt_text" title="image_tooltip">

   </td>
  </tr>
  <tr>
   <td>Tronco
   </td>
   <td>Obstáculo móvil de forma rectangular alargada que se puede mover tanto lateral como horizontalmente.
   </td>
   <td>

<p id="gdcalert15" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image11.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert16">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


<img src="images/image11.png" width="" alt="alt_text" title="image_tooltip">

   </td>
  </tr>
  <tr>
   <td>Corriente
   </td>
   <td>Obstáculo estático no tangible, en el agua que empuja a favor o en contra en cualquiera de las 4 direcciones y ralentiza o acelera dependiendo de su dirección y la del pez
   </td>
   <td>

<p id="gdcalert16" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image12.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert17">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


<img src="images/image12.png" width="" alt="alt_text" title="image_tooltip">

   </td>
  </tr>
  <tr>
   <td>Garza
   </td>
   <td>Área estática en el agua en la cual aparece una garza para empujarte hacia atrás si te mantienes cuando ataque, la zona del ataque tendrá un color tenue y se encenderá al momento del ataque
   </td>
   <td>

<p id="gdcalert17" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image13.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert18">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


<img src="images/image13.png" width="" alt="alt_text" title="image_tooltip">

   </td>
  </tr>
</table>



### NPCs

Hay dos npcs en el juego: Piggy y La Rata Comecables. 

La rata comecables aparece en la selección de piezas, como el mecánico que te modifica las piezas



<p id="gdcalert18" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image14.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert19">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image14.png "image_tooltip")


Peggy aparece en la escena de medallas y te dará instrucciones y consejos sobre como conseguir las medallas



<p id="gdcalert19" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image15.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert20">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image15.png "image_tooltip")



### Niveles

Cada nivel está constituido por un circuito y una cierta cantidad de obstáculos. Para pasar de nivel (es decir desbloquear el siguiente) se debe llegar al final del nivel habiendo acumulado una cierta cantidad de aura. Además existen 3 medallas que se consiguen cuando se completa 


<table>
  <tr>
   <td>Nivel
   </td>
   <td>Descripción del nivel
   </td>
   <td>Obstáculos presentes 
   </td>
  </tr>
  <tr>
   <td>1
   </td>
   <td>Nivel de introducción. Enseña las mecánicas más básicas del juego: acelerar, frenar, girar, el sistema de aura, las indicaciones de curvas. No tiene secciones demasiado difíciles y los obstáculos son pocos y fáciles de esquivar.
   </td>
   <td>Rocas y troncos
   </td>
  </tr>
  <tr>
   <td>2
   </td>
   <td>Empieza a introducir más complejidad al circuito, teniendo mayor número de curvas y obstáculos además de un requerimiento de aura más difícil que en el nivel anterior. El nivel no debería ser muy difícil de superar si se tiene un buen manejo del pez, aunque debería ser desafiante conseguir puntuación perfecta.
   </td>
   <td>Rocas, troncos y corrientes
   </td>
  </tr>
  <tr>
   <td>3
   </td>
   <td>Nivel final del juego, en el cual debes poner en práctica todo lo aprendido.
   </td>
   <td>Rocas, troncos, corrientes y garza
   </td>
  </tr>
</table>




<p id="gdcalert20" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image16.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert21">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image16.png "image_tooltip")


Esquema nivel 1 (sin obstáculos)


## Estética

El juego se ambienta en los ríos de Japón, para los sprites del juego se utilizan modelos 3D prerrenderizados, dándole un aspecto de falso 2D low poly.



<p id="gdcalert21" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image17.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert22">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image17.png "image_tooltip")




<p id="gdcalert22" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image18.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert23">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image18.png "image_tooltip")


(ejemplo de vista superior del pez)


## Referencias

Ultimate Racing 2D

Donkey Kong Country

Vitrum

Daytona usa
