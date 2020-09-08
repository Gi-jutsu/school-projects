import UIKit

protocol ProfilDelegate {
    func logout()
    func changePassword()
}

class ProfilView: UIView {
    @IBOutlet var contentView: UIView!
    
    @IBOutlet var emailLabel: UILabel!
    @IBOutlet var newPasswordField: UITextField!
    @IBOutlet var confNewPasswordField: UITextField!
    
    var delegate: ProfilDelegate?
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        commonInit()
    }

    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
        commonInit()
    }
    
    private func commonInit() {
        Bundle.main.loadNibNamed("ProfilView", owner: self, options: nil)
        addSubview(self.contentView)
        self.contentView.frame = self.bounds
        self.contentView.autoresizingMask = [.flexibleHeight, .flexibleWidth]
    }
    
    @IBAction func logout() {
        self.delegate?.logout()
    }
    
    @IBAction func changePassword() {
        self.delegate?.changePassword()
    }
}
