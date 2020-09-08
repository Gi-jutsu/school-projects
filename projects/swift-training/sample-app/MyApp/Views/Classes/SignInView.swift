import UIKit

protocol SignInViewDelegate {
    func login()
    func goToRegister()
    func octogoneWithGod()
}

class SignInView: UIView {
    @IBOutlet var contentView: UIView!
    
    @IBOutlet var emailField: UITextField!
    @IBOutlet var passwordField: UITextField!
    
    var delegate:SignInViewDelegate?
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        commonInit()
    }
    
    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
        commonInit()
    }
    
    private func commonInit() {
        Bundle.main.loadNibNamed("SignInView", owner: self, options: nil)
        addSubview(self.contentView)
        self.contentView.frame = self.bounds
        self.contentView.autoresizingMask = [.flexibleHeight, .flexibleWidth]
    }

    @IBAction func login() {
        self.delegate?.login()
    }
    
    @IBAction func goToRegister() {
        self.delegate?.goToRegister()
    }
    
    @IBAction func versusGod() {
        self.delegate?.octogoneWithGod()
    }
}
