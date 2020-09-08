import SpriteKit
import GameplayKit

let Players_Categorie_Bit_Mask:UInt32 = 2
let padding:CGFloat = 60

class GameScene: SKScene {
    var player:Player = Player()
    var enemy:Player = Player()
    var ball:Ball = Ball()
    
    var scores:[Int] = [0, 0]
    
    override func didMove(to view: SKView) {
        self.initWorld()
    }
    
    func initWorld() {
        self.physicsWorld.gravity = CGVector.zero
        self.initBorder()
    
        ball.setPosition(x:self.frame.midX, y:self.frame.midY)
        player.setPosition(x: self.frame.midX ,y: self.frame.minY + 100)
        enemy.setPosition(x: self.frame.midX ,y: self.frame.maxY - 100)
        
        self.addChild(ball.ball)
        self.addChild(player.player)
        self.addChild(enemy.player)
        
        ball.start()
    }
    
    func initBorder() {
        let screenWidth = self.frame.size.width
        let screenHeight = self.frame.size.height
        
        let borderFrame = CGRect(origin: CGPoint(x: -screenWidth/2 + padding, y:screenHeight/2), size: CGSize(width: screenWidth - padding * 2, height: -screenHeight))
        
        let border = SKPhysicsBody(edgeLoopFrom: borderFrame)

        border.friction = 0
        border.restitution = 1
        border.affectedByGravity = false
        border.allowsRotation = false
        border.categoryBitMask = Player.Categorie_Mask
        border.collisionBitMask = Ball.Categorie_Mask
        border.contactTestBitMask = Ball.Categorie_Mask
        
        self.physicsBody = border
    }
    
    override func update(_ currentTime: TimeInterval) {
        enemy.autoFollow(ball: ball)
        
        if(scores[0] == 7 || scores[1] == 7) {
            if(scores[0] > scores[1]) {
                print("Enemy won this game")
                self.isPaused = true
            } else {
                print("You won this game")
            }
        } else {
            if(ball.ball.position.y <  -self.frame.size.height/2 + 75) {
                ball.stop()
                ball.restart()
                scores[0] = scores[0] + 1
                print(scores)
            } else if(ball.ball.position.y > self.frame.size.height/2 - 75) {
                //you won this ball
            }
        }
    
    }
    
    override func touchesBegan(_ touches: Set<UITouch>, with event: UIEvent?) {
        for touch in touches {
            let location = touch.location(in: self)
            
            player.player.run(SKAction.moveTo(x:location.x, duration: 0.2))
        }
    }
    
    override func touchesMoved(_ touches: Set<UITouch>, with event: UIEvent?) {
        for touch in touches {
            let location = touch.location(in: self)
            
            player.player.run(SKAction.moveTo(x:location.x, duration: 0.2))
        }
    }
}
