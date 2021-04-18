## OBJECTIVE

To demonstrate the relationship between the intelligence of an AI with frequency of how many times the AI is trained by using Q-Learning Algorithm

## Q-LEARNING ALGORITHM 

Q-learning is a model-free reinforcement learning algorithm to learn the value of an action in a particular state.

## Q-LEARNING ALGORITHM USED

Q(current state, action taken) = old_Q_value + alpha*(new value estimate - old_Q_value)

where:
* alpha = learning rate which is a constant with value of 0.5
* new value estimate = reward in current stat + reward from taking action

## ABOUT NIM

Nim is a mathematical game of strategy in which two players take turns removing (or "nimming") objects from distinct heaps or piles. On each turn, a player must remove at least one object, and may remove any number of objects provided they all come from the same heap or pile. The goal of the game is **to avoid taking the last object**.

## ABOUT THIS PROJECT

After running npm start, you will be shown a form in which you need to specify between 3 to 9, how much the height of the pile you wish to play with.

![image](https://user-images.githubusercontent.com/60194292/115157613-860f1b00-a08a-11eb-960f-ba9a799ba0aa.png)


Next, you will need to specify how much you wish for the AI to be train before you fight against it, it doesnt matter how much as long as it is more than 0

![image](https://user-images.githubusercontent.com/60194292/115157621-92937380-a08a-11eb-9f34-f23866288864.png)


Then you will have to fight against the AI, the goal is the **avoid taking the last 1 item from the pile**.

The turn on which get to move first is set to random. Each player **must pick at least 1 item per turn**. Player also can only pick item from the same row.

![image](https://user-images.githubusercontent.com/60194292/115157640-a343e980-a08a-11eb-8a4b-9e85a4e4fd0f.png)

## CONCLUSION

The AI seems to be more intelligent when it is given a high number of training (as high as 10000).


