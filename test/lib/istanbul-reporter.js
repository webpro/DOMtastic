module.exports = function(runner) {
    runner.on('end', function(){
        process.stdout.write(JSON.stringify(global.__coverage__));
    });
};
