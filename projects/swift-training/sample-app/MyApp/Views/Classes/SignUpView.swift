import UIKit

protocol SignUpViewDelegate {
    func register()
    func goToLogin()
}

class SignUpView: UIView {
    @IBOutlet var contentView: UIView!
    
    @IBOutlet var emailField: UITextField!
    @IBOutlet var passwordField: UITextField!
    @IBOutlet var passwordConfField: UITextField!
    
    var delegate:SignUpViewDelegate?
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        commonInit()
    }
    
    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
        commonInit()
    }
    
    private func commonInit() {
        Bundle.main.loadNibNamed("SignUpView", owner: self, options: nil)
        addSubview(self.contentView)
        self.contentView.frame = self.bounds
        self.contentView.autoresizingMask = [.flexibleHeight, .flexibleWidth]
    }
    
    @IBAction func register() {
        self.delegate?.register()
    }
    
    @IBAction func goToLogin() {
        self.delegate?.goToLogin()
    }
}
