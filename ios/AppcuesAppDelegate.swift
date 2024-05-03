import ExpoModulesCore
import AppcuesKit

public class AppcuesAppDelegate: ExpoAppDelegateSubscriber {

    public func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey : Any]? = nil) -> Bool {
      Appcues.enableAutomaticPushConfig()

      return true
    }
}
