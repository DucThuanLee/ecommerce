package de.ecommerce.userservice.user.controller;

import de.ecommerce.userservice.user.dto.UserRequest;
import de.ecommerce.userservice.user.dto.UserResponse;
import de.ecommerce.userservice.user.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public UserResponse create(@Valid @RequestBody UserRequest request) {
        return userService.createUser(request);
    }

    @GetMapping("/{id}")
    public UserResponse getById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

//    @GetMapping
//    public List<UserResponse> list() {
//        return userService.getAllUsers();
//    }

    @GetMapping
    public ResponseEntity<List<UserResponse>> list() {

        // 1. Gọi Service để lấy danh sách
        List<UserResponse> users = userService.getAllUsers();

        // 2. Trả về đối tượng ResponseEntity
        // .ok() là cách viết tắt cho ResponseEntity.status(HttpStatus.OK).body(users)
        return ResponseEntity.ok(users);

        // Cấu trúc đầy đủ (nếu bạn muốn linh hoạt hơn):
        // return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public UserResponse update(@PathVariable Long id,
                               @Valid @RequestBody UserRequest request) {
        return userService.updateUser(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        userService.deleteUser(id);
    }
}
