function signalSuccess () {
    crickit.servo3.setAngle(130)
    pause(1000)
    crickit.servo3.setAngle(50)
    pause(1000)
    crickit.servo3.setAngle(130)
    pause(1000)
    crickit.servo3.setAngle(50)
    pause(1000)
    crickit.servo3.setAngle(90)
}
function Detect_ir () {
    irLeft = crickit.signal8.analogRead() <= Couleur_min
    irRight = crickit.signal1.analogRead() <= Couleur_min
}
function detectCiterne () {
    tempsActuel = control.millis()
    // Vérifiez si suffisamment de temps s'est écoulé depuis le dernier dépôt
    if (crickit.signal4.analogRead() < 40 && tempsActuel - dernierDepot > intervalleMinimum) {
        dropBilles()
        dernierDepot = tempsActuel
    }
}
function followLine () {
    if (irLeft && !(irRight)) {
        crickit.motor2.run(Puissance_max)
        crickit.motor1.run(Puissance_min)
    } else if (!(irLeft) && irRight) {
        crickit.motor2.run(Puissance_min)
        crickit.motor1.run(Puissance_max)
    } else if (!(irLeft) && !(irRight)) {
        crickit.tank(0, 0)
    } else {
        crickit.tank(Puissance_moy, Puissance_moy)
    }
    pause(Pause2)
}
function dropBilles () {
    // Empêcher les appels répétés à dropBilles pendant l'exécution
    crickit.tank(0, 0)
    crickit.servo1.setAngle(120)
    pause(1000)
    crickit.servo1.setAngle(0)
    pause(2000)
    signalSuccess()
    crickit.servo2.setAngle(120)
    pause(2000)
    crickit.servo2.setAngle(0)
}
let tempsActuel = 0
let irRight = false
let irLeft = false
let dernierDepot = 0
let intervalleMinimum = 0
let Couleur_min = 0
let Puissance_min = 0
let Puissance_moy = 0
let Puissance_max = 0
let Pause2 = 0
Pause2 = 75
Puissance_max = 75
Puissance_moy = 60
Puissance_min = -50
Couleur_min = 100
intervalleMinimum = 3000
music.baDing.play()
crickit.signal2.digitalWrite(true)
crickit.signal7.digitalWrite(true)
crickit.servo1.setAngle(0)
crickit.servo2.setAngle(0)
dernierDepot = 0
forever(function () {
    Detect_ir()
    followLine()
    detectCiterne()
    pause(20)
})
