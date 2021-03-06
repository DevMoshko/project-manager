package com.ergis.projectmanager.services;

import com.ergis.projectmanager.domain.Backlog;
import com.ergis.projectmanager.domain.ProjectTask;
import com.ergis.projectmanager.exceptions.ProjectExceptions.ProjectCodeException;
import com.ergis.projectmanager.exceptions.ProjectTaskExceptions.ProjectTaskException;
import com.ergis.projectmanager.repositories.IBacklogRepository;
import com.ergis.projectmanager.repositories.IProjectTaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectTaskService {

    @Autowired
    private IProjectTaskRepository projectTaskRepository;
    @Autowired
    private IBacklogRepository backlogRepository;
    @Autowired
    private ProjectService projectService;

    public ProjectTask save(String code, ProjectTask projectTask, String username) {

        // Check Project/Backlog Ownership
        Backlog backlog = projectService.findByCode(code.toUpperCase(), username).getBacklog();
        if(backlog == null) throw new ProjectCodeException("Project with code '" + code.toUpperCase() + "' doesn't exist");

        projectTask.setBacklog(backlog);

        // ProjectTask sequence will look like: TESTCODE-1 TESTCODE-2 TESTCODE-3 ...
        // If you delete TESTCODE-2 the sequence will continue on TESTCODE-4 TESTCODE-5 ...
        Integer currentSequence = backlog.getPTSequence();
        currentSequence++;

        // Set the sequence to ProjectTask && update Backlog's PTSequence
        String taskSequence = code.toUpperCase() + "-" + currentSequence;

        projectTask.setCode(code.toUpperCase());
        projectTask.setSequence(taskSequence);

        backlog.setPTSequence(currentSequence);

        // INITIAL priority when priority is null: 3
        // PRIORITIES: 1-High 2-Normal 3-Low

        if(projectTask.getPriority() == null || projectTask.getPriority() == 0)
            projectTask.setPriority(3);

        // INITIAL status when status is null:
        if(projectTask.getStatus() == "" || projectTask.getStatus() == null)
            projectTask.setStatus("TO_DO");

        return projectTaskRepository.save(projectTask);
    }

    public Iterable<ProjectTask> findByCode(String code, String username) {

        // CHECK: Project exists / Backlog ownership
        Backlog backlog = projectService.findByCode(code.toUpperCase(), username).getBacklog();

        return projectTaskRepository.findByCodeOrderByPriority(code.toUpperCase());
    }

    public ProjectTask findBySequence(String code, String sequence, String username) {

        // CHECK: Project exists / Backlog ownership
        Backlog backlog = projectService.findByCode(code.toUpperCase(), username).getBacklog();

        // Make sure that our task exists
        ProjectTask projectTask = projectTaskRepository.findBySequence(sequence);
        if(projectTask == null) throw new ProjectTaskException("Task '" + sequence + "' doesn't exist");

        // Make sure ProjectTask belongs to the corresponding backlog
        if(!projectTask.getCode().equals(code.toUpperCase())) throw new ProjectCodeException("Task '" + sequence + "' doesn't exist in project '" + code.toUpperCase() + "'");

        return projectTaskRepository.findBySequence(sequence);
    }

    public ProjectTask update(ProjectTask updatedProjectTask, String code, String sequence, String username) {

        ProjectTask projectTask = findBySequence(code, sequence, username); // This line performs the validations
        projectTask = updatedProjectTask;

        return projectTaskRepository.save(projectTask);
    }

    public void deleteBySequence(String code, String sequence, String username) {

        ProjectTask projectTask = findBySequence(code, sequence, username); // This line performs the validations
        projectTaskRepository.delete(projectTask);
    }
}
