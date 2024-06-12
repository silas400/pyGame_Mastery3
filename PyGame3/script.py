import pygame as pg

pg.init()
width, height = 800, 600
screen = pg.display.set_mode((width, height))
time = pg.time.Clock()

velocity = 2

player_sprite = pg.Rect(0, 0, 100, 100)
player_sprite.center = [width//2, height//2]
moving_sprite = pg.Rect(0, 0, 100, 100)
moving_sprite.bottomright = [width, height]

font_size = 36
font = pg.font.SysFont('arial', font_size)  # Using Arial, a commonly available font

text_color = (255, 255, 255)  # White text
text_background = (0, 0, 255)  # Blue background
text = "Hello Pygame!"

main_text = font.render("Hello Pygame!", True, text_color, text_background)
collision_text =  font.render("Collision", True, text_color, text_background)

paused = 0

running = True
while running:
    mouse_pos = pg.mouse.get_pos()
    keys = pg.key.get_pressed()
    for event in pg.event.get():
        if event.type == pg.QUIT:
            running = False
    if keys[pg.K_e]:
        paused += 1
        paused %= 2

    if paused == 0:
        if keys[pg.K_w]:
            player_sprite.y -= velocity
        if keys[pg.K_s]:
            player_sprite.y += velocity
        if keys[pg.K_a]:
            player_sprite.x -= velocity
        if keys[pg.K_d]:
            player_sprite.x += velocity
        screen.fill((0,0,0))

        moving_sprite.x-=3
        if moving_sprite.x <= -100:
            moving_sprite.x = 800

        if player_sprite.colliderect(moving_sprite):
            collision_frame = True
            screen.blit(collision_text, [50, 20])
        else:
            screen.blit(main_text, [50, 20])
        

        if moving_sprite.collidepoint(mouse_pos):
            print(pg.mouse.get_pressed())

        '''container = pg.draw.rect(screen, (255, 255, 255), [50, 50, 300, 300])
        new_rect = pg.Rect(0,0,200,200)
        new_rect.midbottom = container.midbottom
        pg.draw.rect(screen, (255, 0, 0), new_rect)'''

        pg.draw.rect(screen, (255,0,0), player_sprite)
        pg.draw.rect(screen, (0,0,255), moving_sprite)

        pg.display.flip()
    time.tick(60)

pg.quit()