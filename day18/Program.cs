var lines = File.ReadAllLines("input.txt");

var walls = lines.Select(l => l.Split(',').Select(int.Parse)).Select(p => (x: p.First(), y: p.Last())).Take(1024).ToList();
Console.WriteLine($"Part 1: {FindPath(walls).Count}");

Parallel.For(1024, lines.Length, (i, state) =>
{
    var wall2 = lines.Select(l => l.Split(',').Select(int.Parse)).Select(p => (x: p.First(), y: p.Last())).Take(i).ToList();
    if (FindPath(wall2).Count == 0)
    {
        Console.WriteLine($"Part 2: {i} - {wall2.Last()}");
        state.Break();
    }
});

static List<Node> FindPath(List<(int x, int y)> walls)
{
    var start = (x: 0, y: 0);
    var end = (x: 70, y: 70);
    var width = end.x + 1;
    var height = end.y + 1;

    var openList = new List<Node>();
    var closedList = new List<Node>();

    var startNode = new Node(start.x, start.y)
    {
        g = 0,
        h = Math.Abs(start.x - end.x) + Math.Abs(start.y - end.y)
    };
    startNode.f = startNode.g + startNode.h;

    openList.Add(startNode);

    while (openList.Count > 0)
    {
        var currentNode = openList.OrderBy(n => n.f).First();
        if (currentNode.x == end.x && currentNode.y == end.y)
        {
            var path = new List<Node>();

            while (currentNode.parent != null)
            {
                path.Add(currentNode);
                currentNode = currentNode.parent;
            }
            return path;
        }
        openList.Remove(currentNode);
        closedList.Add(currentNode);
        var neighbors = new List<Node>
        {
            new(currentNode.x + 1, currentNode.y),
            new(currentNode.x, currentNode.y + 1),
            new(currentNode.x - 1, currentNode.y),
            new(currentNode.x, currentNode.y - 1)
        };

        foreach (var neighbor in neighbors)
        {
            if (neighbor.x < 0 || neighbor.x >= width || neighbor.y < 0 || neighbor.y >= height)
                continue;
            if (walls.Any(w => w.x == neighbor.x && w.y == neighbor.y))
                continue;
            if (closedList.Any(n => n.x == neighbor.x && n.y == neighbor.y))
                continue;

            var g = currentNode.g + 1;
            var h = Math.Abs(neighbor.x - end.x) + Math.Abs(neighbor.y - end.y);
            var f = g + h;
            if (openList.Any(n => n.x == neighbor.x && n.y == neighbor.y))
            {
                var existingNode = openList.First(n => n.x == neighbor.x && n.y == neighbor.y);
                if (g < existingNode.g)
                {
                    existingNode.g = g;
                    existingNode.f = f;
                    existingNode.parent = currentNode;
                }
            }
            else
            {
                var newNode = new Node(neighbor.x, neighbor.y)
                {
                    g = g,
                    h = h,
                    f = f,
                    parent = currentNode
                };
                openList.Add(newNode);
            }
        }
    }

    return [];
}

class Node(int x, int y)
{
    public int x = x;
    public int y = y;
    public int g;
    public int h;
    public int f;
    public Node? parent;
}