package com.feazesa.fun;

import lombok.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.repository.CrudRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.List;
import java.util.stream.Collectors;

@SpringBootApplication
public class TaskApplication {
    public static void main(String[] args) {
        SpringApplication.run(TaskApplication.class, args);
    }
}

@RequestMapping("/api/tasks/")
@RestController
class TaskController {

    private final TaskRepository taskRepository;

    @Autowired
    public TaskController(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @PostMapping
    public ResponseEntity<Long> createTask(@RequestBody Task.TaskDTO request) {
        final var task = new Task().fromDTO(request);
        final var dto = taskRepository.save(task).toDTO();
        return ResponseEntity.ok(dto.getId());
    }

    @GetMapping("{id}")
    public ResponseEntity<Object> findTask(@PathVariable Long id) {
        final var findTask = taskRepository.findById(id);

        return findTask.
                <ResponseEntity<Object>>map(task -> ResponseEntity.ok().body(task.toDTO()))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("{\n\"message\": \"Cannot find task with given id\"}"));
    }

    @PutMapping("{id}")
    public ResponseEntity<Object> updateTask(@PathVariable Long id, @RequestBody Task.TaskDTO request) {
        final var findTask = taskRepository.findById(id);

        if (findTask.isPresent()) {
            final var task = findTask.get().fromDTO(request);
            taskRepository.save(task);
            return ResponseEntity.ok().body(task.toDTO());
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\n\"message\": \"Cannot find task with given id\"}");

    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        final var findTask = taskRepository.findById(id);

        if (findTask.isPresent()) {
            taskRepository.delete(findTask.get());
            return ResponseEntity.ok().build();
        }

        return ResponseEntity.notFound().build();
    }

    @GetMapping
    public ResponseEntity<List<Task.TaskDTO>> findAllTasks() {
        final var list = taskRepository.findAll();

        if (list.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(list
                .stream()
                .map(Task::toDTO)
                .collect(Collectors.toList()));
    }

}

@AllArgsConstructor
@Builder
@Entity
@Setter
class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String description;
    private Integer priority;
    private Status status;

    protected Task() {
    }

    enum Status {
        CREATED, CANCELLED, IN_PROGRESS, FINISHED
    }

    public TaskDTO toDTO() {
        return TaskDTO.builder()
                .id(this.id)
                .description(this.description)
                .priority(this.priority)
                .status(this.status.name())
                .build();
    }

    public Task fromDTO(TaskDTO dto) {
        if (this.id == null) {
            return Task.builder()
                    .description(dto.getDescription())
                    .priority(dto.getPriority())
                    .status(Status.valueOf(dto.getStatus() == null ? Status.CREATED.name() : dto.getStatus()))
                    .build();
        } else {
            this.setDescription(dto.getDescription());
            this.setPriority(dto.getPriority());
            this.setStatus(Status.valueOf(dto.getStatus()));
            return this;
        }
    }

    @AllArgsConstructor
    @Builder
    @Getter
    @NoArgsConstructor
    public static class TaskDTO {
        private Long id;
        private String description;
        private Integer priority;
        private String status;
    }
}

interface TaskRepository extends CrudRepository<Task, Long> {
    List<Task> findAll();
}