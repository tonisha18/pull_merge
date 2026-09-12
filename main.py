import matplotlib.pyplot as plt
import matplotlib.animation as animation
import random

# The Algorithm
def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and key < arr[j]:
            arr[j + 1] = arr[j]
            j -= 1
            yield arr  # Yields the array state for the animation frame
        arr[j + 1] = key
        yield arr

# Animation Setup
arr = random.sample(range(1, 50), 20)
fig, ax = plt.subplots()
ax.set_title("Insertion Sort Step-by-Step")
bar_rects = ax.bar(range(len(arr)), arr, align="edge", color="steelblue")
ax.set_xlim(0, len(arr))
ax.set_ylim(0, int(1.1 * max(arr)))

def update_fig(arr, rects):
    for rect, val in zip(rects, arr):
        rect.set_height(val)

# Run and Display
generator = insertion_sort(arr)
ani = animation.FuncAnimation(fig, func=update_fig, fargs=(bar_rects,), 
                              frames=generator, interval=200, repeat=False, cache_frame_data=False)
plt.show()