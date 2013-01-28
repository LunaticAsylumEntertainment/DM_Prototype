// Fireball Behaviour
// create fireball, point at target, get to travel, kill after set time
// Currently no collision

var ProjectileSpeed: float; 

var soldierCamera : SoldierCamera;
var smoke : GameObject;
var explosionEmitter : GameObject;
var explosionTime : float;
var explosionRadius : float;
var power : float = 32;
var timeKill : float;

private var cam : Camera;
var lifeTime : int;

//Explosion Audio
public var nearSounds : AudioClip[];
public var farSounds : AudioClip[];
public var farSoundDistance : float = 25.0;
	

private var myTransform:Transform;
private var impact : boolean;
private var timer : float;


  
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
	   impact = false;
	   timer = 0.0;
	   var target = GameObject.FindGameObjectWithTag("AimTarget");
	   
	   ProjectileSpeed = 20;
	      // rotate the projectile to aim the target:
	   myTransform.LookAt(target.transform);
	}
	
	
	//Taken from the grenade script and stripped out the explosion mechanics
	//May need to re-implement the glass exploding
	function Explode()
	{
		Debug.Log("Exploding");
			
		//play audio
		PlayExplosion();

		if(explosionEmitter != null)
		{
			GameObject.Instantiate(explosionEmitter, transform.position, Quaternion.identity);
		}
		
		myTransform = transform;
		
	    impact = true;
	    rigidbody.velocity = Vector3.zero;
		rigidbody.angularVelocity = Vector3.zero;
		renderer.enabled = false;
		//Hide the fireball
	    var renderers = gameObject.GetComponentsInChildren.Target();
	    for (var r : Renderer in renderers) {
        	r.enabled = false;
    	}
		
	}
	
	function PlayExplosion()
	{
	
	   	var sIndex : int;
		sIndex = Random.Range(0, nearSounds.length);
		audio.PlayOneShot(nearSounds[sIndex]);
	    Debug.Log("SoundPlayed");
		timer = nearSounds[sIndex].length + 1.0;
	    
	}
	
	     
	// Update is called once per frame. Update the position of the Fireball
	function Update () 
	{
	   
	   
	   // distance moved since last frame:
	   // Removed the update here to use the code in Gun.js
	   
	       
	   // var amtToMove:float;
	   // amtToMove = ProjectileSpeed * Time.deltaTime;
	   // translate projectile in its forward direction:
	   // myTransform.Translate(Vector3.forward * amtToMove);
	   
	   
	   
	   // Kill if the fireball is old enough or has hit anything
	   if ( Time.time > timeKill + lifeTime )Destroy (gameObject);
	   if(impact)
		{
			if(timer > 0.0) // need to wait for the audio to finish playing
			{
				timer -= Time.deltaTime;
				transform.position = myTransform.position;
				if(timer <= 0.0)
				{
					Destroy(gameObject);
				}	
			}
		}
	   	   	   	
	}
	
	function OnCollisionEnter(c : Collision)
	{
		
	   Debug.Log("collision on enter");
	   Explode();
	}
		
	function OnCollisionStay(c : Collision)
	{
		
	   //Debug.Log("collision stay");
	}
		
	function OnCollisionExit(c : Collision)
	{
		
	   //Debug.Log("collision exit");
	}