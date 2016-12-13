# Asteroids
Asteroids using ES6 class syntax.

An ES6 take on the classic browser game Asteroids. Compiled with Babel for backwards compatibility, I implement new ES6 class syntax alongside HTML5 and Canvas to render a colored background complete with asteroid, bullet, and spaceship images. Slug it out versus 10 asteroids and unlimited lives. Both asteroids and the ship wrap to the boundaries of the 1000x600 canvas. I utilize Webpack to conveniently output the Asteroids game assets into a production ready bundle. Hosted through Github's free gh-pages service: spanishiwa.github.io/Asteroids/

Version 1.00a
Known bugs:
No bullet aiming functionality - bullet vel is relative to ship vel.
No turning ability for ship - ship direction is locked and bullet-exit point fixed.
