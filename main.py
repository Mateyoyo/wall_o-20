def Detect_ir():
    if crickit.signal1.analog_read() < Couleur_min:
        crickit.signal1.digital_write(True)
    elif crickit.signal8.analog_read() < Couleur_min:
        crickit.signal8.digital_write(True)
    else:
        crickit.signal1.digital_write(False)
        crickit.signal8.digital_write(False)
# Fonction pour simuler la détection d'une citerne
def detectCiterne():
    if crickit.signal4.digital_read():
        return True
    return False
# Fonction pour suivre la ligne noire avec les capteurs tactiles
def followLine():
    # Utiliser les capteurs pour guider les moteurs
    if irLeft and not (irRight):
        # Tourne légèrement à gauche
        crickit.motor1.run(50)
        crickit.motor2.run(100)
    elif irRight and not (irLeft):
        # Tourne légèrement à droite
        crickit.motor1.run(100)
        crickit.motor2.run(50)
    else:
        # Avancer tout droit
        crickit.motor1.run(100)
        # Pleine vitesse pour les deux moteurs
        crickit.motor2.run(100)
# Fonction pour déposer les billes
def dropBilles():
    crickit.servo1.set_angle(90)
    # Ouvre la trappe
    pause(1000)
    # Attendre 1 seconde
    crickit.servo1.set_angle(0)
    pause(5000)
Couleur_min = 0
music.ba_ding.play()
Couleur_min = 50
irLeft = crickit.touch1
irRight = crickit.touch2

def on_forever():
    Detect_ir()
    followLine()
    if detectCiterne():
        crickit.tank(0, 0)
        dropBilles()
        pause(2000)
forever(on_forever)
