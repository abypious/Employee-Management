package com.example.employee_management.controller;

import com.example.employee_management.model.Employee;
import com.example.employee_management.model.Department;
import com.example.employee_management.repository.EmployeeRepository;
import com.example.employee_management.repository.DepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private DepartmentRepository departmentRepository;

    // GET all employees (with optional sorting)
    @GetMapping
    public List<Employee> getAllEmployees(
            @RequestParam(required = false) String sortBy,
            @RequestParam(required = false) String order // asc or desc
    ) {
        if (sortBy != null) {
            Sort sort = Sort.by(sortBy);
            if ("desc".equalsIgnoreCase(order)) {
                sort = sort.descending();
            } else {
                sort = sort.ascending();
            }
            return employeeRepository.findAll(sort);
        }
        return employeeRepository.findAll();
    }

    // GET employee by ID
    @GetMapping("/{id}")
    public Employee getEmployeeById(@PathVariable Long id) {
        return employeeRepository.findById(id).orElse(null);
    }

    // SEARCH employees by name, department name or job title
    @GetMapping("/search")
    public List<Employee> searchEmployees(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String jobTitle,
            @RequestParam(required = false) String department
    ) {
        if (name != null) {
            return employeeRepository.findByNameContainingIgnoreCase(name);
        } else if (jobTitle != null) {
            return employeeRepository.findByJobTitleContainingIgnoreCase(jobTitle);
        } else if (department != null) {
            return employeeRepository.findByDepartmentNameContainingIgnoreCase(department);
        } else {
            return employeeRepository.findAll();
        }
    }

    // CREATE employee
    @PostMapping
    public Employee createEmployee(@RequestBody Employee employee) {
        if (employee.getDepartment() != null && employee.getDepartment().getId() != null) {
            Department dept = departmentRepository.findById(employee.getDepartment().getId()).orElse(null);
            employee.setDepartment(dept);
        }
        return employeeRepository.save(employee);
    }

    // UPDATE employee
    @PutMapping("/{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable Long id, @RequestBody Employee employeeDetails) {
        Employee employee = employeeRepository.findById(id).orElse(null);
        if (employee == null) {
            return ResponseEntity.notFound().build();
        }

        if (employeeDetails.getName() != null) employee.setName(employeeDetails.getName());
        if (employeeDetails.getEmail() != null) employee.setEmail(employeeDetails.getEmail());
        if (employeeDetails.getPhone() != null) employee.setPhone(employeeDetails.getPhone());
        if (employeeDetails.getJobTitle() != null) employee.setJobTitle(employeeDetails.getJobTitle());
        if (employeeDetails.getSalary() != null) employee.setSalary(employeeDetails.getSalary());
        if (employeeDetails.getDateOfJoining() != null) employee.setDateOfJoining(employeeDetails.getDateOfJoining());
        if (employeeDetails.getDepartment() != null && employeeDetails.getDepartment().getId() != null) {
            Department dept = departmentRepository.findById(employeeDetails.getDepartment().getId()).orElse(null);
            employee.setDepartment(dept);
        }
        if (employeeDetails.getAddress() != null) employee.setAddress(employeeDetails.getAddress());
        if (employeeDetails.getDateOfBirth() != null) employee.setDateOfBirth(employeeDetails.getDateOfBirth());
        if (employeeDetails.getGender() != null) employee.setGender(employeeDetails.getGender());
        if (employeeDetails.getMaritalStatus() != null) employee.setMaritalStatus(employeeDetails.getMaritalStatus());
        if (employeeDetails.getEmergencyContact() != null) employee.setEmergencyContact(employeeDetails.getEmergencyContact());
        if (employeeDetails.getManager() != null && employeeDetails.getManager().getId() != null) {
            Employee manager = employeeRepository.findById(employeeDetails.getManager().getId()).orElse(null);
            employee.setManager(manager);
        }

        Employee updatedEmployee = employeeRepository.save(employee);
        return ResponseEntity.ok(updatedEmployee);
    }



    // DELETE employee
    @DeleteMapping("/{id}")
    public String deleteEmployee(@PathVariable Long id) {
        if(employeeRepository.existsById(id)) {
            employeeRepository.deleteById(id);
            return "Employee deleted successfully";
        }
        return "Employee not found";
    }
}
