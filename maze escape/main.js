/**
 * Notes:
 * - Coordinates are specified as (X, Y, Z) where X and Z are horizontal and Y
 *   is vertical
 */

var map = [ // 1  2  3  4  5  6  7  8  9 10 11 12
	          [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,], // 0
	          [3, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 3,], // 1
	          [3, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 3,], // 2
	          [3, 0, 0, 1, 2, 1, 2, 1, 2, 0, 0, 3,], // 3
	          [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3,], // 4
	          [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3,], // 5
	          [3, 0, 1, 2, 1, 2, 1, 2, 1, 2, 1, 3,], // 6
	          [3, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 3,], // 7
	          [3, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 3,], // 8
	          [3, 0, 0, 2, 0, 0, 2, 1, 2, 0, 0, 3,], // 9
              [3, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 3,], // 10
              [3, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 3,], // 11
	          [3, 3, 3, 3, 3, 3, 3, 0, 0, 3, 3, 3,], // 12
], mapW = map.length, mapH = map[0].length;

var rock = [ // 1  2  3  4  5  6  7  8  9  10 11 12
	           [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,], // 0
	           [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,], // 1
	           [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,], // 2
	           [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,], // 3
	           [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,], // 4
	           [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,], // 5
	           [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,], // 6
	           [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,], // 7
	           [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,], // 8
	           [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,], // 9
               [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,], // 10
               [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,], // 11
	           [1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1,], // 12
], rockW = rock.length, rockH = rock[0].length;

var coin = [ // 1  2  3  4  5  6  7  8  9 10 11
	           [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,], // 0
	           [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,], // 1
	           [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,], // 2
	           [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,], // 3
	           [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,], // 4
	           [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,], // 5
	           [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,], // 6
	           [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,], // 7
	           [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,], // 8
	           [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,], // 9
	           [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,], // 10
], coinW = coin.length, coinH = coin[0].length;


// Semi-constants
var WIDTH = window.innerWidth,
	HEIGHT = window.innerHeight,
	ASPECT = WIDTH / HEIGHT,
	UNITSIZE = 230,
	WALLHEIGHT = 300,
	MOVESPEED = 150,
	LOOKSPEED = 0.075,
	BULLETMOVESPEED = MOVESPEED * 5,
	NUMAI = 3,
	PROJECTILEDAMAGE = 20
TREES = 0;

// Global vars
var t = THREE, scene, cam, renderer, controls, clock, projector, model, skin;
var runAnim = true, mouse = { x: 0, y: 0 }, kills = 0, health = 100;
var healthCube, coin, tree, cone, lastHealthPickup = 0, coinPickup = 0;
var spotLight;
/*
var finder = new PF.AStarFinder({ // Defaults to Manhattan heuristic
	allowDiagonal: true,
}), grid = new PF.Grid(mapW, mapH, map);
*/

// Initialize and run on document ready
$(document).ready(function () {
	$('body').append('<div id="intro"> Click to start, Escape the Maze </div>');
    
	$('#intro').css({ width: WIDTH, height: HEIGHT }).one('click', function (e) {
		e.preventDefault();
		$(this).fadeOut();
		init();
		setInterval(drawRadar, 1000);
		animate();
	});
	/*
	new t.ColladaLoader().load('models/Yoshi/Yoshi.dae', function(collada) {
		model = collada.scene;
		skin = collada.skins[0];
		model.scale.set(0.2, 0.2, 0.2);
		model.position.set(0, 5, 0);
		scene.add(model);
	});
	*/
});

// Setup
function init() {
	clock = new t.Clock(); // Used in render() for controls.update()
	projector = new t.Projector(); // Used in bullet projection
	scene = new t.Scene(); // Holds all objects in the canvas
	scene.fog = new t.FogExp2(0x202020, 0.0000); // color, density //0x282828



	// Set up camera
	cam = new t.PerspectiveCamera(60, ASPECT, 20, 10000); // FOV, aspect, near, far
	cam.position.y = UNITSIZE * .4;
	cam.position.x = -UNITSIZE -UNITSIZE -UNITSIZE -UNITSIZE -UNITSIZE -UNITSIZE;
	scene.add(cam);

	// Camera moves with mouse, flies around with WASD/arrow keys
	controls = new t.FirstPersonControls(cam);
	controls.movementSpeed = MOVESPEED;
	controls.lookSpeed = LOOKSPEED;
	controls.lookVertical = false; // Temporary solution; play on flat surfaces only
	controls.noFly = true;

	// World objects
	setupScene();

	// Artificial Intelligence
	setupAI();

	// coins
	//setupCoins();

	// Handle drawing as WebGL (faster than Canvas but less supported)
	renderer = new t.WebGLRenderer();
	renderer.setSize(WIDTH, HEIGHT);

	// Add the canvas to the document
	renderer.domElement.style.backgroundColor = '#0000ff'; // easier to see
	document.body.appendChild(renderer.domElement);

	// Track mouse position so we know where to shoot
	document.addEventListener('mousemove', onDocumentMouseMove, false);

    // Create a different scene to hold our buffer objects
       var bufferScene = new t.Scene();
    // Create the texture that will store our result
       var bufferTexture = new t.WebGLRenderTarget( window.innerWidth, window.innerHeight, { minFilter: t.LinearFilter, magFilter: t.NearestFilter});



	// Set up "hurt" flash
	$('body').append('<div id="hurt"></div>');
	$('#hurt').css({ width: WIDTH, height: HEIGHT, });
}

// Helper function for browser frames
function animate() {
	if (runAnim) {
		requestAnimationFrame(animate);
	}
	render();
	stats.update();
}

// Update and display
function render() {
	var delta = clock.getDelta(), speed = delta * BULLETMOVESPEED;
	var aispeed = delta * MOVESPEED;
	controls.update(delta); // Move camera

	// Rotate the health cube
	healthcube.rotation.x += 0.004
	healthcube.rotation.y += 0.008;

	// Rotate the Coins
	coin.rotation.x += 0.070
	coin.rotation.y += 0.000;
	coin1.rotation.x += 0.070
	coin1.rotation.y += 0.000;
	coin2.rotation.x += 0.070
	coin2.rotation.y += 0.000;
	coin3.rotation.x += 0.070
	coin3.rotation.y += 0.000;
	coin4.rotation.x += 0.070
	coin4.rotation.y += 0.000;
	coin5.rotation.x += 0.070
	coin5.rotation.y += 0.000;
	coin6.rotation.x += 0.070
	coin6.rotation.y += 0.000;
	coin7.rotation.x += 0.070
	coin7.rotation.y += 0.000;
	coin8.rotation.x += 0.070
	coin8.rotation.y += 0.000;
	coin9.rotation.x += 0.070
	coin9.rotation.y += 0.000;
	coin10.rotation.x += 0.070
	coin10.rotation.y += 0.000;
	coin11.rotation.x += 0.070
	coin11.rotation.y += 0.000;
	coin12.rotation.x += 0.070
	coin12.rotation.y += 0.000;
	coin13.rotation.x += 0.070
	coin13.rotation.y += 0.000;
	coin14.rotation.x += 0.070
	coin14.rotation.y += 0.000;




	// Allow picking it up once per minute
	if (Date.now() > lastHealthPickup + 60000) {
		if (distance(cam.position.x, cam.position.z, healthcube.position.x, healthcube.position.z) < 15 && health != 100) {
			health = Math.min(health + 50, 100);
			$('#health').html(health);
			lastHealthPickup = Date.now();
		}
		healthcube.material.wireframe = false;
	}
	else {
		healthcube.material.wireframe = true;
	}

	// Allow picking up the coins
	if (Date.now() > coinPickup) {
		if (distance(cam.position.x, cam.position.z, coin.position.x, coin.position.z) < 0) {
			//	health = Math.min(health);
			//	$('#health').html(health);
			coinPickup = Date.now();
		}
		coin.material.wireframe = false;
	}
	else {
		coin.material.wireframe = true;
	}

	// Update bullets. Walk backwards through the list so we can remove items.
	for (var i = bullets.length - 1; i >= 0; i--) {
		var b = bullets[i], p = b.position, d = b.ray.direction;
		if (checkWallCollision(p)) {
			bullets.splice(i, 1);
			scene.remove(b);
			continue;
		}
		// Collide with AI
		var hit = false;
		for (var j = ai.length - 1; j >= 0; j--) {
			var a = ai[j];
			var v = a.geometry.vertices[0];
			var c = a.position;
			var x = Math.abs(v.x), z = Math.abs(v.z);
			//console.log(Math.round(p.x), Math.round(p.z), c.x, c.z, x, z);
			if (p.x < c.x + x && p.x > c.x - x &&
				p.z < c.z + z && p.z > c.z - z &&
				b.owner != a) {
				bullets.splice(i, 1);
				scene.remove(b);
				a.health -= PROJECTILEDAMAGE;
				var color = a.material.color, percent = a.health / 100;
				a.material.color.setRGB(
					percent * color.r,
					percent * color.g,
					percent * color.b
				);
				hit = true;
				break;
			}
		}
		// Bullet hits player
		if (distance(p.x, p.z, cam.position.x, cam.position.z) < 25 && b.owner != cam) {
			$('#hurt').fadeIn(75);
			health -= 10;
			if (health < 0) health = 0;
			//val = health < 25 ? '<span style="color: darkRed">' + health + '</span>' : health;
			$('#health').html(val);
			bullets.splice(i, 1);
			//scene.remove(b);
			//$('#hurt').fadeOut(350);
		}
		if (!hit) {
			b.translateX(speed * d.x);
			//bullets[i].translateY(speed * bullets[i].direction.y);
			b.translateZ(speed * d.z);
		}
	}

	// Update AI.
	for (var i = ai.length - 1; i >= 0; i--) {
		var a = ai[i];
		if (a.health <= 0) {
			ai.splice(i, 1);
			scene.remove(a);
			kills++;
			$('#score').html(kills * 100);
			//addAI();
		}
		// Move AI
		var r = Math.random();
		if (r > 0.995) {
			a.lastRandomX = Math.random() * 2 - 1;
			a.lastRandomZ = Math.random() * 2 - 1;
		}
		a.translateX(aispeed * a.lastRandomX);
		a.translateZ(aispeed * a.lastRandomZ);
		var c = getMapSector(a.position);
		if (c.x < 0 || c.x >= mapW || c.y < 0 || c.y >= mapH || checkWallCollision(a.position)) {
			a.translateX(-2 * aispeed * a.lastRandomX);
			a.translateZ(-2 * aispeed * a.lastRandomZ);
			a.lastRandomX = Math.random() * 2 - 1;
			a.lastRandomZ = Math.random() * 2 - 1;
		}
		if (c.x < -1 || c.x > mapW || c.z < -1 || c.z > mapH) {
			ai.splice(i, 1);
			scene.remove(a);
			//addAI();
		}
		/*
		var c = getMapSector(a.position);
		if (a.pathPos == a.path.length-1) {
			console.log('finding new path for '+c.x+','+c.z);
			a.pathPos = 1;
			a.path = getAIpath(a);
		}
		var dest = a.path[a.pathPos], proportion = (c.z-dest[1])/(c.x-dest[0]);
		a.translateX(aispeed * proportion);
		a.translateZ(aispeed * 1-proportion);
		console.log(c.x, c.z, dest[0], dest[1]);
		if (c.x == dest[0] && c.z == dest[1]) {
			console.log(c.x+','+c.z+' reached destination');
			a.PathPos++;
		}
		*/
		var cc = getMapSector(cam.position);
		if (Date.now() > a.lastShot + 750 && distance(c.x, c.z, cc.x, cc.z) < 2) {
			createBullet(a);
			a.lastShot = Date.now();
		}
	}

	renderer.render(scene, cam); // Repaint

	// Death
	if (health <= 0) {
		runAnim = false;
		$(renderer.domElement).fadeOut();
		$('#radar, #hud, #credits').fadeOut();
		$('#intro').fadeIn();
		$('#intro').html('Ouch! Click to restart...');
		$('#intro').one('click', function () {
			location = location;
			/*
			$(renderer.domElement).fadeIn();
			$('#radar, #hud, #credits').fadeIn();
			$(this).fadeOut();
			runAnim = true;
			animate();
			health = 100;
			$('#health').html(health);
			kills--;
			if (kills <= 0) kills = 0;
			$('#score').html(kills * 100);
			cam.translateX(-cam.position.x);
			cam.translateZ(-cam.position.z);
			*/
		});
	}
}

// Set up the objects in the world
function setupScene() {
	var UNITSIZE = 250, units = mapW;

	// Geometry: floor

	var floor = new t.Mesh(
		new t.CubeGeometry(3500, 5, 3500),     //(units * UNITSIZE * 2, 5, units * UNITSIZE),
		new t.MeshBasicMaterial({color: 0x990000,/* map: t.ImageUtils.loadTexture('lighting/images/floor-2.jpg')*/})
    );
   // texture.needsUpdate = true;
   
	scene.add(floor);

   /* var floorTexture = t.ImageUtils.loadTexture( 'C:lighting/images/floor-2.jpg' );
    floorTexture.wrapS = floorTexture.wrapT = t.RepeatWrapping; 
    floorTexture.repeat.set( 5, 5 );
    var floorMaterial = new t.MeshBasicMaterial( { color: 0xff00ff, /*map: floorTexture});
    var floorGeometry = new t.PlaneGeometry(3500, 3500, 5, 5);
    var floor = new t.Mesh(floorGeometry, floorMaterial);
   // floor.position.y = -0.5;
   // floor.rotation.x = Math.PI / 2;
    scene.add(floor);*/



	// Geometry: walls
	var cube = new t.CubeGeometry(UNITSIZE, WALLHEIGHT, UNITSIZE);
	var materials3 = [
		new t.MeshBasicMaterial({ color: 0xcca300, /* map: t.ImageUtils.loadTexture('lighting/images/wall-1.jpg')*/}),
		new t.MeshBasicMaterial({ color: 0x005532, /*map: t.ImageUtils.loadTexture('lighting/images/wall-2.jpg')*/}),
		new t.MeshBasicMaterial({ color: 0xFF8C00 }),
	];
	for (var i = 0; i < mapW; i++) {
		for (var j = 0, m = map[i].length; j < m; j++) {
			if (map[i][j]) {
				var wall = new t.Mesh(cube, materials3[map[i][j] - 1]);
				wall.position.x = (i - units / 2) * UNITSIZE;
				wall.position.y = WALLHEIGHT / 2;
				wall.position.z = (j - units / 2) * UNITSIZE;
				scene.add(wall);
			}
		}
	}


	// Geometry: trees
	var cube1 = new t.CubeGeometry(260, 150, 260);
	var materials = [
		new t.MeshBasicMaterial({ color: 0x000000,/*map: t.ImageUtils.loadTexture('images/wall-1.jpg')*/ }),
		new t.MeshLambertMaterial({ color: 0x228B22,/*map: t.ImageUtils.loadTexture('images/wall-2.jpg')*/ }),
		new t.MeshLambertMaterial({ color: 0x228B22 }),
	];
	var cube2 = new t.CubeGeometry(260, 150, 260);
	var materials1 = [
		new t.MeshBasicMaterial({ color: 0x666666,/*map: t.ImageUtils.loadTexture('images/wall-1.jpg')*/ }),
		new t.MeshLambertMaterial({ color: 0x8B4513,/*map: t.ImageUtils.loadTexture('images/wall-2.jpg')*/ }),
		new t.MeshLambertMaterial({ color: 0x8B4513 }),
	];
	for (var i = 0; i < rockW; i++) {
		for (var j = 0, r = rock[i].length; j < r; j++) {
			if (rock[i][j]) {
				var bottom = new t.Mesh(cube1, materials[rock[i][j] - 1]);
				var top = new t.Mesh(cube2, materials1[rock[i][j] - 1]);
				//cube.position.set(-UNITSIZE-30, 80, -UNITSIZE-30);


				top.position.x = (i - units / 2) * UNITSIZE;
				top.position.y = UNITSIZE - 20;
				top.position.z = (j - units / 2) * UNITSIZE;
				scene.add(top);

				bottom.position.x = (i - units / 2) * UNITSIZE;
				bottom.position.y = 60;
				bottom.position.z = (j - units / 2) * UNITSIZE;
				scene.add(bottom);
			}
		}
	}



	// coins
	var cylinder = new t.CylinderGeometry(50, 50, 5, 40, 1);
	var materials3 = [
		new t.MeshLambertMaterial({ color: 0xFFD700,/*map: t.ImageUtils.loadTexture('images/wall-1.jpg')*/ }),
		new t.MeshLambertMaterial({ color: 0xFFD700,/*map: t.ImageUtils.loadTexture('images/wall-2.jpg')*/ }),
		new t.MeshLambertMaterial({ color: 0xFFD700 }),
	];
	for (var i = 0; i < coinW; i++) {
		for (var j = 0, c = coin[i].length; j < c; j++) {
			if (coin[i][j]) {
				var coins = new t.Mesh(cylinder, materials3[coin[i][j] - 1]);

				coins.position.x = (i - units / 2) * UNITSIZE;
				coins.position.y = UNITSIZE - 185;
				coins.position.z = (j - units / 2) * UNITSIZE;
				coins.rotation.x += 1.5;
				coins.rotation.y += 0.000;

				scene.add(coins);

			}

		}

	}
    
    

    

	// Health cube
	healthcube = new t.Mesh(
		new t.CubeGeometry(30, 30, 30),
		new t.MeshBasicMaterial({ color: 0xFF0000, /*map: t.ImageUtils.loadTexture('images/health.png')*/ })

	);
	healthcube.position.set(-UNITSIZE - 15, 35, -UNITSIZE - 15);
	//scene.add(healthcube);


	//Coins
	coin = new t.Mesh(
		new t.CylinderGeometry(10, 10, 5, 10, 1, false),
		new t.MeshBasicMaterial({ color: 0xFFD700, /*THREE.ImageUtils.loadTexture('coin1.png'),overdraw: true*/ })
	);
	coin.position.set(-UNITSIZE - 30, 25, -UNITSIZE - 30);
	//scene.add(coin);

	coin1 = new t.Mesh(
		new t.CylinderGeometry(10, 10, 5, 10, 1, false),
		new t.MeshBasicMaterial({ color: 0xFFD700, /*THREE.ImageUtils.loadTexture('coin1.png'),overdraw: true*/ })
	);
	coin1.position.set(-UNITSIZE - 400, 25, -UNITSIZE - 40);
	//scene.add(coin1);

	//Coins
	coin2 = new t.Mesh(
		new t.CylinderGeometry(10, 10, 5, 10, 1, false),
		new t.MeshBasicMaterial({ color: 0xFFD700, /*THREE.ImageUtils.loadTexture('coin1.png'),overdraw: true*/ })
	);
	coin2.position.set(-UNITSIZE - 40, 25, -UNITSIZE - 500);
	//scene.add(coin2);

	//Coins
	coin3 = new t.Mesh(
		new t.CylinderGeometry(10, 10, 5, 10, 1, false),
		new t.MeshBasicMaterial({ color: 0xFFD700, /*THREE.ImageUtils.loadTexture('coin1.png'),overdraw: true*/ })
	);
	coin3.position.set(-UNITSIZE - 300, 25, -UNITSIZE - 400);
	//scene.add(coin3);

	//Coins
	coin4 = new t.Mesh(
		new t.CylinderGeometry(10, 10, 5, 10, 1, false),
		new t.MeshBasicMaterial({ color: 0xFFD700, /*THREE.ImageUtils.loadTexture('coin1.png'),overdraw: true*/ })
	);
	coin4.position.set(-UNITSIZE - 500, 25, -UNITSIZE - 600);
	//scene.add(coin4);

	coin5 = new t.Mesh(
		new t.CylinderGeometry(10, 10, 5, 10, 1, false),
		new t.MeshBasicMaterial({ color: 0xFFD700, /*THREE.ImageUtils.loadTexture('coin1.png'),overdraw: true*/ })
	);
	coin5.position.set(-UNITSIZE + 30, 25, -UNITSIZE + 30);
	//scene.add(coin5);

	coin6 = new t.Mesh(
		new t.CylinderGeometry(10, 10, 5, 10, 1, false),
		new t.MeshBasicMaterial({ color: 0xFFD700, /*THREE.ImageUtils.loadTexture('coin1.png'),overdraw: true*/ })
	);
	coin6.position.set(-UNITSIZE + 400, 25, -UNITSIZE + 40);
	//scene.add(coin6);

	//Coins
	coin7 = new t.Mesh(
		new t.CylinderGeometry(10, 10, 5, 10, 1, false),
		new t.MeshBasicMaterial({ color: 0xFFD700, /*THREE.ImageUtils.loadTexture('coin1.png'),overdraw: true*/ })
	);
	coin7.position.set(-UNITSIZE + 40, 25, -UNITSIZE + 500);
	//scene.add(coin7);

	//Coins
	coin8 = new t.Mesh(
		new t.CylinderGeometry(10, 10, 5, 10, 1, false),
		new t.MeshBasicMaterial({ color: 0xFFD700, /*THREE.ImageUtils.loadTexture('coin1.png'),overdraw: true*/ })
	);
	coin8.position.set(-UNITSIZE + 200, 25, -UNITSIZE + 400);
	//scene.add(coin8);

	//Coins
	coin9 = new t.Mesh(
		new t.CylinderGeometry(10, 10, 5, 10, 1, false),
		new t.MeshBasicMaterial({ color: 0xFFD700, /*THREE.ImageUtils.loadTexture('coin1.png'),overdraw: true*/ })
	);
	coin9.position.set(-UNITSIZE + 500, 25, -UNITSIZE + 600);
	//	scene.add(coin9);

	//Coins
	coin10 = new t.Mesh(
		new t.CylinderGeometry(10, 10, 5, 10, 1, false),
		new t.MeshBasicMaterial({ color: 0xFFD700, /*THREE.ImageUtils.loadTexture('coin1.png'),overdraw: true*/ })
	);
	coin10.position.set(+UNITSIZE - 500, 25, +UNITSIZE - 600);
	//	scene.add(coin10);

	coin11 = new t.Mesh(
		new t.CylinderGeometry(10, 10, 5, 10, 1, false),
		new t.MeshBasicMaterial({ color: 0xFFD700, /*THREE.ImageUtils.loadTexture('coin1.png'),overdraw: true*/ })
	);
	coin11.position.set(+UNITSIZE - 30, 25, +UNITSIZE - 30);
	//	scene.add(coin11);

	coin12 = new t.Mesh(
		new t.CylinderGeometry(10, 10, 5, 10, 1, false),
		new t.MeshBasicMaterial({ color: 0xFFD700, /*THREE.ImageUtils.loadTexture('coin1.png'),overdraw: true*/ })
	);
	coin12.position.set(+UNITSIZE - 400, 25, +UNITSIZE - 40);
	//	scene.add(coin12);

	//Coins
	coin13 = new t.Mesh(
		new t.CylinderGeometry(10, 10, 5, 10, 1, false),
		new t.MeshBasicMaterial({ color: 0xFFD700, /*THREE.ImageUtils.loadTexture('coin1.png'),overdraw: true*/ })
	);
	coin13.position.set(+UNITSIZE - 40, 25, +UNITSIZE - 500);
	//	scene.add(coin13);

	//Coins
	coin14 = new t.Mesh(
		new t.CylinderGeometry(10, 10, 5, 10, 1, false),
		new t.MeshBasicMaterial({ color: 0xFFD700, /*THREE.ImageUtils.loadTexture('coin1.png'),overdraw: true*/ })
	);
	coin14.position.set(+UNITSIZE - 200, 25, +UNITSIZE - 400);
	//	scene.add(coin14);	




	//var coin = [];
	//var coinGeo = new t.CylinderGeometry(20, 20, 3, 10, 1, false),
	//function setupCoins() {
	//for (var i = 0; i < NUMCOINS; i++) {
	//addCOIN();
	//}
	//}

	// Lighting
	 var directionalLight1 = new t.DirectionalLight( 0xF7EFBE, 0.3 );
	 directionalLight1.position.set( 0.0, 50, 50 );
	 scene.add( directionalLight1 );
	var directionalLight2 = new t.DirectionalLight( 0xF7EFBE, 0.5 );
	 directionalLight2.position.set( -0.5, -1, -0.5 );
	scene.add( directionalLight2 );

	// var light = new t.PointLight( 0xFFFF00, 0.5, 20 );
	// light.position.set( 5, 5, 5 );
	// scene.add( light );
   
	var intensity = 10; //2.5
	var distance =375; //100
	var decay = 2.0; //2.0
	var c1 = 0xFFFF00, c2 = 0xF7EFBE, c3 = 0xF7EFBE, c4 = 0xF7EFBE, c5 = 0xF7EFBE, c6 = 0xF7EFBE;
	var sphere = new t.SphereGeometry(0.25, 16, 8); // 0.25, 16, 8
   
	var cube = new t.CubeGeometry(100, 40, 70);
	

	light1 = new t.PointLight(c1, intensity, distance, decay);
	light1.add(new t.Mesh(sphere, new t.MeshBasicMaterial({ color: c1 })));
	//light1.position.set(+UNITSIZE - 30, 300, +UNITSIZE - 30);
	//scene.add( light1 );

	light2 = new t.PointLight(c2, intensity, distance, decay);
	light2.add(new t.Mesh(sphere, new t.MeshBasicMaterial({ color: c2 })));
	light2.position.set(-UNITSIZE + 1000, 300, -UNITSIZE + 1000);
	scene.add(light2);

	light3 = new t.PointLight(c3, intensity, distance, decay);
	light3.add(new t.Mesh(sphere, new t.MeshBasicMaterial({ color: c3 })));
	light3.position.set(-UNITSIZE + 600, 300, -UNITSIZE + 600);
	//scene.add( light3 );

	light4 = new t.PointLight(c4, intensity, distance, decay);
	light4.add(new t.Mesh(sphere, new t.MeshBasicMaterial({ color: c4 })));
	light4.position.set(+UNITSIZE - 400, 300, +UNITSIZE - 1000);
	scene.add(light4);

	light5 = new t.PointLight(c5, intensity, distance, decay);
	light5.add(new t.Mesh(sphere, new t.MeshBasicMaterial({ color: c5 })));
	light5.position.set(-UNITSIZE - 30, 300, +UNITSIZE + 30);
	//scene.add( light5 );

	light6 = new t.PointLight(c6, intensity, distance, decay);
	light6.add(new t.Mesh(sphere, new t.MeshBasicMaterial({ color: c6 })));
	light6.position.set(-UNITSIZE - 700, 300, -UNITSIZE - 30);
	scene.add(light6);

	var dlight = new t.DirectionalLight(0x383838, 0.5);
	dlight.position.set(0.0, 50, 50).normalize();
	scene.add(dlight);

	//light7 = new t.PointLight(c1, intensity, distance, decay);

    //add subtle ambient lighting
    var ambientLight = new t.AmbientLight(0xbbbbbb);
    //scene.add(ambientLight);
    
    var spotlight3 = new t.SpotLight(0xFFFF00, 1);
    spotlight3.position.ai;  // 20, 100, -1
    spotlight3.shadowCameraVisible = true;
    spotlight3.shadowDarkness = 0.95;
    spotlight3.intensity = 10;
    spotlight3.castShadow = true;
    scene.add(spotlight3);
    // change the direction this spotlight is facing
    var lightTarget = new t.Object3D();
    lightTarget.position.set(UNITSIZE - 500, 400, UNITSIZE - 500); // 150, 10, -100
    scene.add(lightTarget);
    spotlight3.target = lightTarget;

}
var ai = [];
var aiGeo = new t.CubeGeometry(100, 40, 70);
//var spot = new t.SpotLight(c6, intensity, distance, decay);

function setupAI() {
	for (var i = 0; i < NUMAI; i++) {
		addAI();
	}
}
function addAI() {
	var c = getMapSector(cam.position);
	var aiMaterial = new t.MeshBasicMaterial({ color: 0x7FFF00,/*map: t.ImageUtils.loadTexture('images/face.png')*/ });
	var o = new t.Mesh(aiGeo, aiMaterial);
    //var s = new t.SpotLight(spotlight3, 0x7FFF00, 1);
	do {
		var x = getRandBetween(0, mapW - 1);
		var z = getRandBetween(0, mapH - 1);
	} while (map[x][z] > 0 || (x == c.x && z == c.z));
	x = Math.floor(x - mapW / 2) * UNITSIZE;
	z = Math.floor(z - mapW / 2) * UNITSIZE;
	o.position.set(x, UNITSIZE * .25, z);
	//s.position.set(x, UNITSIZE * 1.5, z);
	o.health = 100;
	//s.health = 100;
	//o.path = getAIpath(o);
    //s.path = getAIpath(o);
	o.pathPos = 1;
	//s.pathPos = 1;
	o.lastRandomX = Math.random();
	//s.lastRandomX = Math.random();
	o.lastRandomZ = Math.random();
	//s.lastRandomZ = Math.random();
	o.lastShot = Date.now(); // Higher-fidelity timers aren't a big deal here.
	//s.lastShot = Date.now(); // Higher-fidelity timers aren't a big deal here.
	ai.push(o);
	scene.add(o);
   //o.push(spotlight3);
	//ai.push(s);
	//scene.add(s);
   
}

function getAIpath(a) {
	var p = getMapSector(a.position);
	do { // Cop-out
		do {
			var x = getRandBetween(0, mapW - 1);
			var z = getRandBetween(0, mapH - 1);
		} while (map[x][z] > 0 || distance(p.x, p.z, x, z) < 3);
		var path = findAIpath(p.x, p.z, x, z);
	} while (path.length == 0);
	return path;
}

function findAIpath(sX, sZ, eX, eZ) {
	var backupGrid = grid.clone();
	var path = finder.findPath(sX, sZ, eX, eZ, grid);
	grid = backupGrid;
	return path;
}

function distance(x1, y1, x2, y2) {
	return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
}

function getMapSector(v) {
	var x = Math.floor((v.x + UNITSIZE / 2) / UNITSIZE + mapW / 2);
	var z = Math.floor((v.z + UNITSIZE / 2) / UNITSIZE + mapW / 2);
	return { x: x, z: z };
}


function checkWallCollision(v) {
	var c = getMapSector(v);
	return map[c.x][c.z] > 0;
	return rock[c.x][c.z] > 0;
	//return map, cone, cone1, cone2, cone3, cone4, cone5, cone6, 
	//sphere, sphere1, sphere2, sphere3[c.x][c.z]>0;

}


// Radar
function drawRadar() {
	var c = getMapSector(cam.position), context = document.getElementById('radar').getContext('2d');
	context.font = '10px Helvetica';
	for (var i = 0; i < mapW; i++) {
		for (var j = 0, m = map[i].length; j < m; j++) {
			var d = 0;
			for (var k = 0, n = ai.length; k < n; k++) {
				var e = getMapSector(ai[k].position);
				if (i == e.x && j == e.z) {
					d++;
				}
			}
			if (i == c.x && j == c.z && d == 0) {
				context.fillStyle = '#0000FF';
				context.fillRect(i * 20, j * 20, (i + 1) * 20, (j + 1) * 20);
			}
			else if (i == c.x && j == c.z) {
				context.fillStyle = '#AA33FF';
				context.fillRect(i * 20, j * 20, (i + 1) * 20, (j + 1) * 20);
				context.fillStyle = '#000000';
				context.fillText('' + d, i * 20 + 8, j * 20 + 12);
			}
			else if (d > 0 && d < 10) {
				context.fillStyle = '#FF0000';
				context.fillRect(i * 20, j * 20, (i + 1) * 20, (j + 1) * 20);
				context.fillStyle = '#000000';
				context.fillText('' + d, i * 20 + 8, j * 20 + 12);
			}
			else if (map[i][j] > 0) {
				context.fillStyle = '#666666';
				context.fillRect(i * 20, j * 20, (i + 1) * 20, (j + 1) * 20);
			}
			else {
				context.fillStyle = '#CCCCCC';
				context.fillRect(i * 20, j * 20, (i + 1) * 20, (j + 1) * 20);
			}
		}
	}
}

var bullets = [];
var sphereMaterial = new t.MeshBasicMaterial({ color: 0x333333 });
var sphereGeo = new t.SphereGeometry(2, 6, 6);
function createBullet(obj) {
	if (obj === undefined) {
		obj = cam;
	}
	var sphere = new t.Mesh(sphereGeo, sphereMaterial);
	sphere.position.set(obj.position.x, obj.position.y * 0.8, obj.position.z);

	if (obj instanceof t.Camera) {
		var vector = new t.Vector3(mouse.x, mouse.y, 1);
		projector.unprojectVector(vector, obj);
		sphere.ray = new t.Ray(
			obj.position,
			vector.subSelf(obj.position).normalize()
		);
	}
	else {
		var vector = cam.position.clone();
		sphere.ray = new t.Ray(
			obj.position,
			vector.subSelf(obj.position).normalize()
		);
	}
	sphere.owner = obj;

	//bullets.push(sphere);
	//scene.add(sphere);

	return sphere;
}

/*
function loadImage(path) {
	var image = document.createElement('img');
	var texture = new t.Texture(image, t.UVMapping);
	image.onload = function() { texture.needsUpdate = true; };
	image.src = path;
	return texture;
}
*/

function onDocumentMouseMove(e) {
	e.preventDefault();
	mouse.x = (e.clientX / WIDTH) * 2 - 1;
	mouse.y = - (e.clientY / HEIGHT) * 2 + 1;
}

// Handle window resizing
$(window).resize(function () {
	WIDTH = window.innerWidth;
	HEIGHT = window.innerHeight;
	ASPECT = WIDTH / HEIGHT;
	if (cam) {
		cam.aspect = ASPECT;
		cam.updateProjectionMatrix();
	}
	if (renderer) {
		renderer.setSize(WIDTH, HEIGHT);
	}
	$('#intro, #hurt').css({ width: WIDTH, height: HEIGHT, });
});

// Stop moving around when the window is unfocused (keeps my sanity!)
$(window).focus(function () {
	if (controls) controls.freeze = false;
});
$(window).blur(function () {
	if (controls) controls.freeze = true;
});

//Get a random integer between lo and hi, inclusive.
//Assumes lo and hi are integers and lo is lower than hi.
function getRandBetween(lo, hi) {
	return parseInt(Math.floor(Math.random() * (hi - lo + 1)) + lo, 10);
}



