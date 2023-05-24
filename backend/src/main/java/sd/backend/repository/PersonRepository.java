package sd.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sd.backend.entity.Person;

import java.util.Optional;

public interface PersonRepository extends JpaRepository<Person,Long> {
    Optional<Person> findByUsernameAndUserpassword(String username, String psw);
}
