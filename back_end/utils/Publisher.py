
class Publisher():
    def __init__(self):
        self._subscribers = []

    def add_subscriber(self, subscriber):
        self._subscribers.append(subscriber)

    def remove_subscriber(self, subscriber):
        self._subscribers.remove(subscriber)

    def notify(self, message):
        for subscriber in self._subscribers:
            subscriber.update(message)