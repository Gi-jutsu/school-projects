import UIKit

class LoginViewController: UIViewController, SignInViewDelegate, SignUpViewDelegate, ProfilDelegate {
    
    @IBOutlet var signInView: SignInView!
    @IBOutlet var signUpView: SignUpView!
    @IBOutlet var profilView: ProfilView!

    var userModel: User?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        self.signInView?.delegate = self
        self.signUpView?.delegate = self
        self.profilView?.delegate = self
        
        self.goToLogin()
    }

    func goToRegister() {
        self.signUpView.isHidden = false
        self.signInView.isHidden = true
        self.profilView.isHidden = true
    }
    
    func goToLogin() {
        self.signInView.isHidden = false
        self.signUpView.isHidden = true
        self.profilView.isHidden = true
    }
    
    func goToProfil() {
        self.profilView.isHidden = false
        self.signInView.isHidden = true
        self.signUpView.isHidden = true
    }
    
    func login() {
        guard let user = RegisterUser.user else {
            print("Please register first")
            displayMessage(title: "Login Error" , message:"Please register first")
            return
        }
        
        if let email = self.signInView.emailField.text, let password = self.signInView.passwordField.text {
            if(email == user.email && password == user.password) {
                self.profilView.emailLabel.text = "Email :" + user.email
                self.goToProfil()
                
                return
            }
        }
        
        displayMessage(title: "Login Error" , message:"Unable to find a match with this pair of email / password")
    }
    
    func logout() {
        self.goToLogin()
    }
    
    func register() {
        if let email = self.signUpView.emailField.text, let password = self.signUpView.passwordField.text, let passwordConf = self.signUpView.passwordConfField.text {
            
            if( !(isPasswordValid(password: password) && isEmailValid(email: email)) ) {
                displayMessage(title: "Registering Error" , message:"invalid informations, please enter a valid email and password ( Password must be 8 characters long with a special char and an alphabet ) ")
                return
            } else {
                if(password != passwordConf) {
                    displayMessage (title: "Error Registering" , message:"Passwords are not matching.")
                    return
                }
            }
            RegisterUser.user = User(email: email, password: password)
            self.goToLogin()
        }
    }
    
    func changePassword() {
        if let newPassword = self.profilView.newPasswordField.text, let newConfPassword = self.profilView.confNewPasswordField.text {
            
            if(isPasswordValid(password: newPassword)) {
                if(newPassword == newConfPassword) {
                    RegisterUser.user?.password = newPassword
                    displayMessage (title: "Changing password" , message:"Password change is a success !")
                    
                    self.profilView.confNewPasswordField.text = ""
                    self.profilView.newPasswordField.text = ""
                    return
                } else {
                    displayMessage (title: "Error changing password" , message:"Passwords are not matching.")
                    return
                }
            } else {
                    displayMessage (title: "Error changing password" , message:"Passwords is not valid.")
            }
        }
    }
    
    func isPasswordValid(password : String) -> Bool{
        // Length : 8, One Alphabet, One Special char
        let passwordTest = NSPredicate(format: "SELF MATCHES %@", "^(?=.*[a-z])(?=.*[$@$#!%*?&])[A-Za-z\\d$@$#!%*?&]{8,}")
        return passwordTest.evaluate(with: password)
    }
    
    func isEmailValid(email:String) -> Bool {
        let RegEx = "[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}"
        let emailTest = NSPredicate(format:"SELF MATCHES %@", RegEx)
        return emailTest.evaluate(with: email)
    }
    
    func displayMessage(title: String, message: String) {
        let alertController = UIAlertController(title: title, message: message, preferredStyle: UIAlertController.Style.alert)
        
        let validAction = UIAlertAction(title: "OK", style: UIAlertAction.Style.default) {
            (result : UIAlertAction) -> Void in
        }
        alertController.addAction(validAction)
        self.present(alertController, animated: true, completion: nil)
    }
    
    func octogoneWithGod() {
        if let url = NSURL(string: "GodPong://"), UIApplication.shared.canOpenURL(url as URL) {
            UIApplication.shared.openURL(url as URL)
        }
    }
}
