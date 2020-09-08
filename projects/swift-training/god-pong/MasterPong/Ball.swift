import SpriteKit

let Ball_Radius:CGFloat = 15

class Ball {
    static var Categorie_Mask:UInt32 = 2
    
    var ball: SKShapeNode = SKShapeNode(circleOfRadius: Ball_Radius)
    
    var radius:CGFloat = 15.0
    var speed:CGVector = CGVector(dx: 30,dy: 30)
    var x:CGFloat?
    var y:CGFloat?
    
    init() {
        self.initPhysics()
    }
    
    func initPhysics() {
        ball.fillColor = SKColor.white
        ball.physicsBody = SKPhysicsBody(circleOfRadius: Ball_Radius)
        ball.physicsBody?.friction = 0
        ball.physicsBody?.restitution = 1
        ball.physicsBody?.angularDamping = 0
        ball.physicsBody?.linearDamping = 0
        ball.physicsBody?.isDynamic = true
        ball.physicsBody?.affectedByGravity = false
        ball.physicsBody?.pinned = false
        ball.physicsBody?.allowsRotation = false
        ball.physicsBody?.categoryBitMask = Ball.Categorie_Mask
        ball.physicsBody?.contactTestBitMask = Player.Categorie_Mask
        ball.physicsBody?.collisionBitMask = Player.Categorie_Mask
    }
    
    func setPosition(x:CGFloat, y:CGFloat) {
        self.x = x
        self.y = y
        
        ball.position = CGPoint(x: self.x ?? 0, y: self.y ?? 0)
    }
    
    func start() {
        ball.physicsBody?.applyImpulse(speed)
    }
    
    func stop() {
        ball.physicsBody?.velocity = CGVector.zero
    }
    
    func restart() {
        ball.position = CGPoint(x: self.x ?? 0, y: self.y ?? 0)
        self.start()
    }
}
