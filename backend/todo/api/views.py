from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import TaskSerializer
from .models import Task
import json

# Create your views here.

@api_view(['GET'])
def apiOverview(request):

    api_urls = {
        'List':'/task-list/',
        'Detail View':'/task-detail/<str:pk>/',
        'Create':'/task-create/',
        'Update':'/task-update/<str:pk>/',
        'Delete':'/task-delete/<str:pk>/',
    }

    return Response(api_urls)

# Get list of tasks

@api_view(['GET'])
def taskList(request):
    tasks = Task.objects.all()
    serializer = TaskSerializer(tasks, many=True)
    return Response(serializer.data)


# Get Detail task View
@api_view(['GET'])
def taskDetail(request, pk):
    task = Task.objects.get(item=pk)
    serializer = TaskSerializer(task, many=False)
    return Response(serializer.data)


# Create task 
@api_view(['POST'])
def taskCreate(request):
    print(request.data)
    serializer = TaskSerializer(data=request.data)
    
    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)


# Update task 
@api_view(['POST'])
def taskUpdate(request):

    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    content = body['item']
    
    print(content, 'sasas')
    task = Task.objects.get(item=content)
    serializer = TaskSerializer(instance=task, data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)


# Delete task 
@api_view(['DELETE'])
def taskDelete(request):
    
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    content = body['item']
    
    print(content, 'sasas')
    task = Task.objects.get(item=content)
    task.delete()

    return Response("Item deleted")