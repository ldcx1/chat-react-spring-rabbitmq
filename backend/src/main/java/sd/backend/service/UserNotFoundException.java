package sd.backend.service;

public class UserNotFoundException extends RuntimeException{
    UserNotFoundException() {
        super("Could not find USER ");
    }

}
