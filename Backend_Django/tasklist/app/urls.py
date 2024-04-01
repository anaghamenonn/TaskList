from django.urls import path
from . import views

urlpatterns = [
    path("", views.tasklist),
    path("tasks/<int:pk>", views.task_detail),
]

# urls:
# http://127.0.0.1:8000/tasks
# http://127.0.0.1/tasks/id