## OBJECTIVE

To demonstrate the relationship between the intelligence of an AI with frequency of how many times the AI is trained by using Q-Learning Algorithm

## Q-LEARNING ALGORITHM 

Q-learning is a model-free reinforcement learning algorithm to learn the value of an action in a particular state.

## Q-LEARNING ALGORITHM USED

Q(current state, action taken) = old_Q_value + alpha*(new value estimate - old_Q_value)

where:
* alpha = learning rate which is a constant with value of 0.5
* new value estimate = reward in current state + reward from taking action in relative to current state

## ABOUT NIM

Nim is a mathematical game of strategy in which two players take turns removing (or "nimming") objects from distinct heaps or piles. On each turn, a player must remove at least one object, and may remove any number of objects provided they all come from the same heap or pile. The goal of the game is **to avoid taking the last object**.

## ABOUT THIS PROJECT

After running npm start, you will be shown a form where you need to specify between 3 to 9.

![image](https://user-images.githubusercontent.com/60194292/115157613-860f1b00-a08a-11eb-960f-ba9a799ba0aa.png)


Next, you need to specify how much you wish for the AI to be trained before you fight against it.

![image](https://user-images.githubusercontent.com/60194292/115157621-92937380-a08a-11eb-9f34-f23866288864.png)


Then you have to fight against the AI and the goal is to **avoid taking the last 1 item from the pile**.

The turn on which who get to move first is set to random. 

Each player **must pick at least 1 item per turn**. 

Player must **only pick item from the same row**.

![image](https://user-images.githubusercontent.com/60194292/115157640-a343e980-a08a-11eb-8a4b-9e85a4e4fd0f.png)

## CONCLUSION

AI seems to be more intelligent when it is given a higher number of training (as high as 10000).


