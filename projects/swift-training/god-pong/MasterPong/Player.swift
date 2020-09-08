import SpriteKit


class Player {
    static var Categorie_Mask:UInt32 = 1
    
    let width: CGFloat = 120
    let height: CGFloat = 20
    
    var player: SKShapeNode
    var sprite: CGRect
    
    var x:CGFloat?
    var y:CGFloat?
    
    init() {
        sprite = CGRect(x: 0, y: 0, width: width, height:  height)
        
        player = SKShapeNode(rect: sprite)
        player.fillColor = SKColor.white
        
        self.initPhysics()
    }
    
    func initPhysics() {
        player.physicsBody = SKPhysicsBody(edgeLoopFrom: sprite)
        
        player.physicsBody?.friction = 0
        player.physicsBody?.restitution = 1
        player.physicsBody?.angularDamping = 0
        player.physicsBody?.linearDamping = 0
        player.physicsBody?.categoryBitMask = Player.Categorie_Mask
        player.physicsBody?.collisionBitMask = Ball.Categorie_Mask
        player.physicsBody?.contactTestBitMask = Ball.Categorie_Mask
    }
    
    func setPosition(x:CGFloat, y:CGFloat) {
        self.x = x
        self.y = y
        
        player.position = CGPoint(x: (self.x ?? 0) - width/2, y: self.y ?? 0)
    }
    
    func autoFollow(ball: Ball) {
        player.run(SKAction.moveTo(x: ball.ball.position.x - 20, duration: 0))
    }
}
