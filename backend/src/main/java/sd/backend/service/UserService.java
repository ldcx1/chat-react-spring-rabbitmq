package sd.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sd.backend.entity.Person;
import sd.backend.repository.PersonRepository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class UserService {
    private final PersonRepository userRepo;

    @Autowired
    public UserService(PersonRepository userRepo) {
        this.userRepo = userRepo;
    }

    public Person addUser(Person newUser){
        return userRepo.save(newUser);
    }

    public List<Person> getAllUsers(){
        return userRepo.findAll();
    }

    public Optional<Person> getOneUserById(Long id){
        return Optional.ofNullable(userRepo.findById(id)
                .orElseThrow(() -> new UserNotFoundException()));
    }

    public Person updateUser(Long id,Person updatedUser){
        return userRepo.findById(id)
                .map(user -> {
                    user.setUsername(updatedUser.getUsername());
                    user.setUserpassword(updatedUser.getUserpassword());
                    return userRepo.save(user);
                })
                .orElseGet(() -> {
                    return userRepo.save(updatedUser);
                });
    }

    public Optional<Person> getOneUserByNameAndPassword(String username,String psw){
        return Optional.ofNullable(
            userRepo.findByUsernameAndUserpassword(username,psw).orElseThrow(
                () -> new UserNotFoundException()
            )
        );
    }

    public void deleteUser(Long id){
        userRepo.deleteById(id);
    }
}
