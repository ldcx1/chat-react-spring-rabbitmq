package sd.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import sd.backend.entity.Person;
import sd.backend.repository.PersonRepository;
import sd.backend.service.UserNotFoundException;
import sd.backend.service.UserService;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@CrossOrigin
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/")
    public String index(){
        return "Index working";
    }

    @PostMapping("/user")
    public Person addUser(@RequestBody Person newUser) {
        return userService.addUser(newUser);
    }

    @GetMapping("/users")
    public List<Person> getAll(){
        return userService.getAllUsers();
    }

    @GetMapping("/users/{id}")
    public Optional<Person> one(@PathVariable Long id){
        return userService.getOneUserById(id);
    }

    @PutMapping("/user/{id}")
    public Person update(@PathVariable Long id,@RequestBody Person updatedUser){
        return userService.updateUser(id, updatedUser);
    }

    @GetMapping("/user/{username}/{psw}")
    public Optional<Person> oneByName(@PathVariable String username,@PathVariable String psw){
        return userService.getOneUserByNameAndPassword(username,psw);
    }

    @DeleteMapping("users/{id}")
    public void deleteUser(@PathVariable Long id){
        userService.deleteUser(id);
    }
}

