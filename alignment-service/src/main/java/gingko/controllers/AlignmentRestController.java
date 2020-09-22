package gingko.controllers;

import gingko.model.AlignmentQuery;
import gingko.model.QueryMatch;
import gingko.services.AlignmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.*;

/**
 * REST controller object
 *
 */
@RestController
@CrossOrigin("*")
public class AlignmentRestController {

    // List of all matches made across requests to the application. This is needed so that user can close her browser, and on reopen
    // can see history of all queries made. This does mean that all users will see these, but this is just a base project
    List<QueryMatch> matches = new ArrayList<>();

    // Synchronized collection of pending requests (also needed for browser re-open)
    List<String> pending = Collections.synchronizedList(new ArrayList<>());

    // Executor service for task threads
    ExecutorService executor = Executors.newCachedThreadPool();

    @Autowired
    AlignmentService alignmentService;

    @RequestMapping("/")
    public String home() {
        return "You have reached the Alignment App";
    }

    /**
     * Clear all match objects from collection
     */
    @GetMapping("/clearMatches")
    public void clearMatches() {
        matches.clear();
    }

    /**
     * Get all QueryMatch objects
     *
     * @return List of QueryMatch objects
     * @throws InterruptedException
     */
    @GetMapping("/allMatches")
    public List<QueryMatch> getAllMatches() throws InterruptedException {
        // Wait for all alignment requests to complete
        while (pending.size() > 0) {
            Thread.sleep(1000);
        }
        return matches;
    }

    /**
     * Asynchronous implementation of query alignment request
     *
     * @param query
     * @return
     * @throws ExecutionException
     * @throws InterruptedException
     */
    @PostMapping("/alignAsync")
    public QueryMatch doAlignAsync(@RequestBody AlignmentQuery query) throws ExecutionException, InterruptedException {
        pending.add(query.getSequence());
        Future<QueryMatch> completableFuture = doAlignTask(query);
        QueryMatch match = completableFuture.get();
        matches.add(match);
        pending.remove(query.getSequence());
        return match;
    }

    /**
     * Alignment task
     *
     * @param query
     * @return
     */
    private CompletableFuture<QueryMatch> doAlignTask(AlignmentQuery query) {
        CompletableFuture<QueryMatch> completableFuture = new CompletableFuture<>();

        Executors.newCachedThreadPool().submit(() -> {
            QueryMatch match = alignmentService.doAlignment(query.getSequence());
            completableFuture.complete(match);
            return match;
        });
        return completableFuture;
    }

    /**
     * Vanilla implementation of alignment query
     *
     * @param query
     * @return
     */
    @PostMapping("/align")
    public QueryMatch alignmentPost(@RequestBody AlignmentQuery query) {
        try {
            pending.add(query.getSequence());
            QueryMatch match = alignmentService.doAlignment(query.getSequence());
            matches.add(match);
            pending.remove(query.getSequence());
            return match;

        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}


