// Fireball Behaviour
// create fireball, point at target, get to travel, kill after set time
// Currently no collision

var ProjectileSpeed: float; 

var timeKill : float;
var lifeTime : int;
var soldierCamera : SoldierCamera;
private var cam : Camera;

private var myTransform:Transform;
     
function Awake() 
{
 	myTransform = transform; 
}
     
function Start () 
{
	// Generates the fireball and points it at the target.
	// Target is the object tagged "AimTarget"
	// Attempted to use the Camers and Ray casting but with no immediate success. Might investigate later
   
   
   timeKill = Time.time;
   
   // cam = soldierCamera.camera;
   var target = GameObject.FindGameObjectWithTag("AimTarget");
   // var camRay : Ray = cam.ScreenPointToRay(new Vector3(Screen.width * 0.5, Screen.height * 0.6, 0));
   ProjectileSpeed = 20;
      // rotate the projectile to aim the target:
   myTransform.LookAt(target.transform);
}
     
// Update is called once per frame. Update the position of the Fireball
function Update () 
{
   // distance moved since last frame:
   var amtToMove:float;
   amtToMove = ProjectileSpeed * Time.deltaTime;
   // translate projectile in its forward direction:
   myTransform.Translate(Vector3.forward * amtToMove);
   
   
   
   // Kill if the fireball is old enough
   if ( Time.time > timeKill + lifeTime )Destroy (gameObject);
   	   	
}


function OnCollisionEnter(collision : Collision){

	// Not working
	Debug.Log("Collide");
   Destroy(gameObject);

}