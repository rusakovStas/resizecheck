package com.stasdev.backend.endpoints;

import com.stasdev.backend.model.entitys.ApplicationUser;
import com.stasdev.backend.model.entitys.Role;
import com.stasdev.backend.model.services.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/users")
public class Users {

    @Autowired
    UsersService usersService;

    @GetMapping("/all")
    List<ApplicationUser> getUsers(){
        return usersService.getUsers();
    }

    @GetMapping("/myroles")
    Set<Role> getCurrentUserRole(/*иньектится из спринг секьюрити контекста*/Principal principal){
        return usersService.getUserRole(principal.getName());
    }

    @PostMapping("/create")
    ApplicationUser createUser(@RequestBody ApplicationUser user){
        return usersService.createUser(user);
    }

    @DeleteMapping("/delete/{username}")
    void deleteUser(@PathVariable String username){
        usersService.deleteUserByUserName(username);
    }


}