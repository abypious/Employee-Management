package com.example.employee_management.controller;

import com.example.employee_management.model.Department;
import com.example.employee_management.model.Employee;
import com.example.employee_management.repository.DepartmentRepository;
import com.example.employee_management.repository.EmployeeRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/departments")
public class DepartmentController {

    @Autowired
    private DepartmentRepository departmentRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    // GET all departments
    @GetMapping
    public List<Department> getAllDepartments() {
        return departmentRepository.findAll();
    }

    // GET department by Name
    @GetMapping("/name/{name}")
    public Department getDepartmentByName(@PathVariable String name) {
        return departmentRepository.findByName(name);
    }

    // POST create a new department
    @PostMapping
    public Department createDepartment(@RequestBody Department department) {
        return departmentRepository.save(department);
    }

    // PUT update a department with Id
    @PutMapping("/{id}")
    public Department updateDepartment(@PathVariable Long id, @RequestBody Department deptDetails) {
        Department department = departmentRepository.findById(id).orElse(null);
        if (department != null) {
            department.setName(deptDetails.getName());
            department.setDescription(deptDetails.getDescription());
            return departmentRepository.save(department);
        }
        return null;
    }

    // DELETE department by ID
    @DeleteMapping("/{id}")
    public String deleteDepartmentById(@PathVariable Long id) {
        if(departmentRepository.existsById(id)) {
            departmentRepository.deleteById(id);
            return "Department deleted successfully";
        }
        return "Department not found";
    }

    // Get department by ID
    @GetMapping("/{id}")
    public ResponseEntity<Department> getDepartmentById(@PathVariable Long id) {
        return departmentRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Get employees belonging to a specific department
    @GetMapping("/{id}/employees")
    public List<Employee> getEmployeesByDepartment(@PathVariable Long id) {
        return employeeRepository.findByDepartmentId(id);

    }
}
