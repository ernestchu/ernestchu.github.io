# Writing a Grammer
This section begins with a discussion of how to divide work between a lexical analyzer and a parser. We then consider several transformations that could be applied to get a grammar more suitable for parsing. One technique can **eliminate ambiguity** in the grammar, and other techniques, **left-recursion elimination** and **left factoring**, are useful for rewriting grammars so they become suitable for **top-down parsing**.

## Lexical Versus Syntactic Analysis
We typically use **regular expressions** to construct **lexical analyzers** while using **grammars** to constuct **parsers**. In fact, everything that can be described by a regular expression can also be described by a grammar. We may ask, why use regular expressions to define the lexical syntax. There are serveral reasons:

1. The lexical rules of a language are frequently quite simple, and to describe them we do not need a notation as powerful as grammars.
1. Regular expressions generally provide a more concise and easier-to-understand notation for tokens than grammars.

## Eliminating Ambiguity
Sometimes an ambiguous grammar can be rewritten to eliminate the ambiguity. As an example, we shall eliminate the ambiguity from the following "dangling-else" grammar:

$$\begin{matrix}
\textit{stmt}   & \rightarrow   & \bold{if} \; \textit{expr} \; \bold{then} \; \textit{stmt} \;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\; \\
                & \vert         & \bold{if} \; \textit{expr} \; \bold{then} \; \textit{stmt} \; \bold{else} \; \textit{stmt} \\
                & \vert         & \bold{other} \;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\; \\
\end{matrix}$$ (1)

Here $other$ stands for any other statement. According to this grammar, the compound conditional statement

$$\bold{if} \; E_1 \; \bold{then} \; S_1 \; \bold{else} \; \bold{if} \; E_2 \; \bold{then} \; S_2 \; \bold{else} \; S_3$$

is an example showing Grammar (1) is ambiguous since it has two parse trees

![ambiguity-1](../assets/graphs/syntax-analysis/writing-a-grammer/svg/ambiguity-1.svg)
![ambiguity-2](../assets/graphs/syntax-analysis/writing-a-grammer/svg/ambiguity-2.svg)

In all programming languages with conditional statements of this form, the **first** parse tree is preferred. The general rule is, Match each $\bold{else}$ with the **closest** unmatched $\bold{then}$. This disambiguating rule can be incorporated directly into a grammar by using the following observations.

- A statement appearing between a $\bold{then}$ and a $\bold{else}$ must be matched ($\bold{if}\text{-}\bold{then\text{-}else}$ pairs).
- Thus statements must split into kinds: $\textit{matched}$ and $\textit{unmatched}$.
- The unambiguous grammar for $\bold{if}\text{-}\bold{then\text{-}else}$ statements can be described as 

$$\begin{matrix}
\textit{stmt}               & \rightarrow   & \textit{matched\_stmt} \;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\; \\
                            & \vert         & \textit{unmatched\_stmt} \;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\; \\
\textit{matched\_stmt}      & \rightarrow   & \bold{if} \; \textit{expr} \; \bold{then} \; \textit{matched\_stmt} \; \bold{else} \; \textit{matched\_stmt} \;\;\; \\
                            & \vert         & \bold{other} \;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\; \\
\textit{unmatched\_stmt}    & \rightarrow   & \bold{if} \; \textit{expr} \; \bold{then} \; \textit{stmt} \;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\; \\
                            & \vert         & \bold{if} \; \textit{expr} \; \bold{then} \; \textit{matched\_stmt} \; \bold{else} \; \textit{unmatched\_stmt} \\
\end{matrix}$$

## Elimination of Left Recursion
A grammar is *left recursive* if it has a nonterminal $A$ such that there is a derivation $A \xRightarrow{+} A \alpha$ for some string $\alpha$. Top-down parsing methods cannot handle left-recursive grammars, so a transformation is needed to eliminate left recursion.

### A simple left recursion
The left-recursive production $A \rightarrow A \alpha \vert \beta$ could be replaced by non-left-recursive productions without changing the strings derivable from $A$.

$$\begin{matrix}
A  & \rightarrow & \beta A' \;\; \\
A' & \rightarrow & \alpha A' \; \vert \; \epsilon \\
\end{matrix}$$

#### Exercise
Consider the following grammar for arithmetic expressions.

$$\begin{matrix}
E & \rightarrow & E + T \; \vert \; T \\
T & \rightarrow & T * F \; \vert \; F \\
F & \rightarrow & \lparen E \rparen \; \vert \; \bold{id} \;\;\; \\
\end{matrix}$$

Eliminating the immediate left recursion (production of the form $A \xRightarrow{+} A \alpha$) to the production for E and then for T.

::: tip Solution
$E \rightarrow E + T \; \vert \; T$ are replaced by

$$\begin{matrix}
E  & \rightarrow & TE' \;\;\;\;\;\; \\
E' & \rightarrow & +TE' \; \vert \; \epsilon \\
\end{matrix}$$

$T \rightarrow T * F \; \vert \; F$ are replaced by

$$\begin{matrix}
T  & \rightarrow & FT' \;\;\;\;\;\; \\
T' & \rightarrow & *FT' \; \vert \; \epsilon \\
\end{matrix}$$

:::

### The general case
Here, we shall deduce the general form for this formula. Immediate left recursion can be eliminated by the following technique, which works for any number of $A$-productions. First, group the productions as

$$A \rightarrow A \alpha_1 \; \vert \; A \alpha_2 \; \vert \; \cdots \; \vert \; A \alpha_m \; \vert \; \beta_1 \; \vert \; \beta_2 \; \vert \; \cdots \; \vert \; \beta_n$$

where no $\beta_i$ begins with an $A$. Then replace the $A$-productions by

$$\begin{matrix}
A  & \rightarrow & \beta_1 A' \; \vert \; \beta_2 A' \; \vert \; \cdots \; \vert \; \beta_n A' \; \\
A' & \rightarrow & \alpha_1 A' \; \vert \; \alpha_2 A' \; \vert \; \cdots \; \vert \; \alpha_m A' \\
\end{matrix}$$

This eliminates all immediate left recursion, but it doesn't eliminate left recursion involving derications of two ore more steps (not immediate). For example

$$\begin{matrix}
S & \rightarrow & Aa \; \vert \; b \;\;\;\;\;\;\; \\
A & \rightarrow & Ac \; \vert \; Sd \; \vert \; \epsilon \\
\end{matrix}$$ (2)

The nonterminal $S$ is left recursive becauses $S \Rightarrow Aa \Rightarrow Sda$. but it is not immediately left recursive. Hence it can not be eliminate by the above technique. But still, in some cases we can try to handle it by the substitution. The lowe part of the grammar (2) becomes

$$A \rightarrow Ac \; \vert \; Aad \; \vert \; bd \; \vert \; \epsilon$$

Eliminating the immediate left recursion among these $A$-productions yields the
following grammar.

$$\begin{matrix}
S  & \rightarrow & Aa \; \vert \; b \;\;\;\;\;\;\;\;\;\;\; \\
A  & \rightarrow & bdA' \; \vert \; A' \;\;\;\;\;\; \\
A' & \rightarrow & cA' \; \vert \; adA' \; \vert \; \epsilon \\
\end{matrix}$$


